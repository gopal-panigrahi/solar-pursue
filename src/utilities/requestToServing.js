const { post } = require("axios")
const { readFileSync } = require('fs');
const { fromBase64 } = require('base64url');
const { parentPort, workerData } = require('worker_threads');

async function getPredictions(data) {
	const res = await post('http://localhost:8501/v1/models/sky_detection/versions/2:predict', data, {
		headers: { "content-type": "application/json" }
	});
	return res.data.predictions;
}

function base64_encode(files) {
	const base64 = Array();
	for (let file of files) {
		base64.push([fromBase64(readFileSync(file, 'base64'))]);
	}
	return base64;
}
function batchPredict(imageList) {
	let result = []
	const chunk = 10;
	const encodedImages = base64_encode(imageList.slice(0, chunk));
	const data = {
		"signature_name": "serving_default",
		"instances": encodedImages
	}
	let chain = getPredictions(data);
	for (let i = chunk; i < imageList.length; i += chunk) {
		const encodedImages = base64_encode(imageList.slice(i, i + chunk));
		const data = {
			"signature_name": "serving_default",
			"instances": encodedImages
		}
		chain = chain.then((res) => {
			result = result.concat(res);
			return getPredictions(data);
		}).catch((err) => { console.log(err) });
	}
	return chain.then((res) => { result = result.concat(res); return result; }).catch((err) => { console.log(err) });
}

batchPredict(workerData).then((result) => {
	result = result.map((prediction) => {
		if (prediction[0] >= 0.5) {
			return 'clear'
		} else {
			return 'unclear'
		}
	});
	result = workerData.map((img, index) => ({ imagePath: `file://${img}`, label: result[index] }));
	return result;
}).then((predictions) => {
	parentPort.postMessage(predictions)
}).catch((err) => console.log(err));
