const axios = require("axios")

async function getPredictions(data) {
	const res = await axios.post('http://localhost:8501/v1/models/sky_detection/versions/2:predict', data, {
		headers: { "content-type": "application/json" }
	});
	return res.data.predictions;
}

onmessage = function (encodedImages) {
	let result = []
	const data = {
		"signature_name": "serving_default",
		"instances": encodedImages.data.slice(0, 10)
	}
	let chain = getPredictions(data);
	for (let i = 10; i < encodedImages.data.length; i += 10) {
		const data = {
			"signature_name": "serving_default",
			"instances": encodedImages.data.slice(i, i + 10)
		}
		chain = chain.then((res) => {
			result = result.concat(res);
			console.log(i);
			return this.getPredictions(data);
		}).catch((err) => { console.log(err) });
	}
	postMessage(chain.then((res) => { result = result.concat(res); console.log("over"); return result; }).catch((err) => { console.log(err) }));
}
