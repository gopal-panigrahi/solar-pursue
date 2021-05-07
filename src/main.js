const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');
Store.initRenderer();

const isDev = process.env.NODE_ENV === "development";
const schema = {
  isBasePathSet: {
    type: 'boolean',
    default: false
  },
  basePath: {
    type: 'string',
    default: ''
  }
};
const store = new Store({ schema });


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  /*
    Used while testing base path functionality
  */
  // store.set("isBasePathSet", false);
  // console.log(store.get("basePath"));
  const mainWindow = new BrowserWindow({
    webPreferences: {
      // devTools: isDev,
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY // use a preload script
    }
  });

  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("set-base-path", () => {
  const selectionId = dialog.showMessageBoxSync({
    message: "Set the Base Path",
    type: "info",
    buttons: ["Close App", "Set Path"],
    defaultId: 1,
    title: "Crucial Step",
  });

  if (selectionId) {
    do {
      const filePath = dialog.showOpenDialogSync({
        properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
      });
      if (filePath) {
        store.set("isBasePathSet", true);
        store.set("basePath", filePath[0]);
      }
      else {
        dialog.showErrorBox("Can't Skip this step", "It is important to set the base path for the app which stores all the files and images in the base path folder");
      }
    } while (!store.get("isBasePathSet"));
  }
  else {
    dialog.showErrorBox("Exiting the app", "It is important to set the base path for the app which stores all the files and images in the base path folder");
    app.quit();
  }
});

ipcMain.handle("upload-zip", (event) => {
  // dialog.showOpenDialog({
  //   properties: ['openFile'],
  //   filters: [{ name: 'ZIP', extensions: ['zip'] }]
  // }).then(function (files) {
  //   for (let file_path of files.filePaths) {

  //   }
  //   axios.post("http://127.0.0.1:5000/uploadZip", {
  //     zippath: files.filePaths[0]
  //   }).then(
  //     function (response) {
  //       //ipcMain.send('uploaded-image-list');
  //       dialog.showMessageBox({
  //         message: "Images Uploaded",
  //         type: "info"
  //       })
  //       //mainWindow.loadFile(path.join(__dirname, 'components/imagelist.html'));
  //       event.sender.send('uploaded-image-list', response.data.img_list);
  //       // console.log(response.data.img_list[1]);
  //     }
  //   ).catch(
  //     function (error) {
  //       console.log(error);
  //     }
  //   );
  // }).catch(function (err) {
  //   console.log(err);
  // });

  return { "message": "Bhai Bhai", "status": true };
});