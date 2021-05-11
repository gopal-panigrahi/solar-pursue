const {
    contextBridge,
    ipcRenderer
} = require("electron");
const Store = require('electron-store');
const store = new Store();

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
    uploadZipFile: () => ipcRenderer.invoke('upload-zip'),
    uploadFolder: () => ipcRenderer.invoke('upload-folder'),
    setBasePath: () => ipcRenderer.send('set-base-path'),
    checkBasePath: () => store.get("isBasePathSet"),
    getBasePath: () => store.get("basePath"),
    setRegionInfo: (regionData) => ipcRenderer.send('region-info', regionData)
}
);
