const {
    contextBridge,
    ipcRenderer
} = require("electron");
const Store = require('electron-store');
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
let resultCallback, uploadCallback;
contextBridge.exposeInMainWorld(
    "api", {
    uploadZipFile: () => ipcRenderer.invoke('upload-zip'),
    uploadFolder: (callback) => {
        ipcRenderer.send('upload-folder');
        uploadCallback = callback;
    },
    setBasePath: () => ipcRenderer.send('set-base-path'),
    checkBasePath: () => store.get("isBasePathSet"),
    getBasePath: () => store.get("basePath"),
    setRegionInfo: (regionData) => ipcRenderer.send('region-info', regionData),
    getRegionInfo: () => store.get('region_info'),
    readyForProcessing: () => store.get("readyForProcessing"),
    getUploadedImages: async (count) => ipcRenderer.invoke("get-uploaded-images", count),
    startProcessing: () => ipcRenderer.send("start-processing"),
    getResult: (callback) => resultCallback = callback,
    print: () => ipcRenderer.send('print-pdf')
});

ipcRenderer.on('received-result', (event, result) => resultCallback(result))
ipcRenderer.on('images-uploaded', (event, response) => uploadCallback(response.status))