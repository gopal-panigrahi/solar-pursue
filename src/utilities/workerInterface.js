const { Worker } = require('worker_threads');
const { readdirSync } = require('fs');

const getImageList = function (currentPath) {
    const imageList = readdirSync(currentPath);
    return imageList.map((image) => `${currentPath}/${image}`);
}

const imageList = getImageList('/home/others/Workspace/BaseProjectFolder/kalyan_000000');

function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./requestToServing.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(
                    `Stopped the Worker Thread with the exit code: ${code}`));
        })
    })
}

runService(imageList).then(res => console.log(res)).catch(err => console.error(err))