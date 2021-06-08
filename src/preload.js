const {
    contextBridge,
    ipcRenderer
} = require("electron");
const Store = require('electron-store');
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
let resultCallback;
contextBridge.exposeInMainWorld(
    "api", {
    uploadZipFile: () => ipcRenderer.invoke('upload-zip'),
    uploadFolder: () => ipcRenderer.invoke('upload-folder'),
    setBasePath: () => ipcRenderer.send('set-base-path'),
    checkBasePath: () => store.get("isBasePathSet"),
    getBasePath: () => store.get("basePath"),
    setRegionInfo: (regionData) => ipcRenderer.send('region-info', regionData),
    readyForProcessing: () => store.get("readyForProcessing"),
    getUploadedImages: async (count) => ipcRenderer.invoke("get-uploaded-images", count),
    startProcessing: () => ipcRenderer.send("start-processing"),
    getResult: (callback) => resultCallback = callback
});

ipcRenderer.on('received-result', (event, result) => resultCallback(result))
