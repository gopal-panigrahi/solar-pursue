const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');
import { readdir } from 'fs/promises';
const { Worker } = require('worker_threads');
const { fromBase64 } = require('base64url');
const { post } = require("axios")
// import requestToServing from './utilities/requestToServing.js';

const isDev = process.env.NODE_ENV === "development";
const schema = {
  isBasePathSet: {
    type: 'boolean',
    default: false
  },
  basePath: {
    type: 'string',
    default: ''
  },
  region_info: {
    type: 'object'
  },
  readyForProcessing: {
    type: 'boolean',
    default: false
  },
};
const store = new Store({ schema });


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const BASE_PATH = store.get('basePath');
const TEMP_DIRECTORY = path.join(store.get('basePath'), '.temp')

const createWindow = () => {
  // Create the browser window.
  /*
    Used while testing base path functionality
  */
  const mainWindow = new BrowserWindow({
    webPreferences: {
      // devTools: isDev,
      // nodeIntegrationInWorker: true,
      sandbox: false,
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY // use a preload script
    }
  });

  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  ipcMain.on('print-pdf', () => {
    mainWindow.webContents.printToPDF({}).then((data) => {
      const regionData = store.get('region_info');
      const defaultPath = path.join(store.get('currentRegionPath'), `${regionData.village}_${regionData.pincode}_result.pdf`)
      const pdfPath = dialog.showSaveDialogSync({
        title: 'save pdf',
        defaultPath: defaultPath,
        properties: ['createDirectory', 'showOverwriteConfirmation']
      });
      fs.writeFile(pdfPath, data, (error) => {
        if (error) console.log(error)
      })
    }).catch((err) => {
      console.log(err);
    });
  });

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

function setUpTempDirectory() {
  fs.access(TEMP_DIRECTORY, (error) => {
    if (error) {
      fs.mkdir(TEMP_DIRECTORY, { recursive: true }, (error) => {
        if (error) {
          console.log(error);
        } else {
          return true;
        }
      });
    } else {
      return true;
    }
  });
}

ipcMain.on("set-base-path", () => {
  // store.set("basePath", '/home/others/Workspace/BaseProjectFolder');
  // store.set("isBasePathSet", true);
  setUpTempDirectory();
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

ipcMain.handle("upload-zip", async (event) => {
  const Unzipper = require('adm-zip');
  let unzipped = false;

  const files = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'ZIP', extensions: ['zip'] }]
  });

  if (files.canceled) {
    unzipped = false;
  }
  else {
    for (let file_path of files.filePaths) {
      const zip = new Unzipper(file_path);
      zip.extractAllTo(TEMP_DIRECTORY);
    }
    unzipped = true;
  }
  return { "message": "Unzip Successful", "status": unzipped };
});

ipcMain.on("upload-folder", async (event) => {
  setUpTempDirectory();

  const files = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
  });
  if (files.canceled) {
    event.sender.send('images-uploaded', { status: false });
  }
  else {
    for (let file_path of files.filePaths) {
      readdir(file_path).then((files) => {
        files.forEach(file => {
          if (['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'].includes(path.extname(file))) {
            const source = path.join(file_path, file);
            const destination = path.join(TEMP_DIRECTORY, file);
            fs.copyFile(source, destination, (err) => {
              if (err) throw err;
            });
          }
        })
      }).then(() => {
        event.sender.send('images-uploaded', { status: true });
      }).catch((err) => {
        console.log('err in upload')
      });;
    }
  }
});

function moveToRegion(source, destination, callback) {
  fs.rename(source, destination, function (err) {
    if (err) {
      if (err.code === 'EXDEV') {
        copy();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copy() {
    var readStream = fs.createReadStream(source);
    var writeStream = fs.createWriteStream(destination);

    readStream.on('error', callback);
    writeStream.on('error', callback);

    readStream.on('close', function () {
      fs.unlink(source, callback);
    });

    readStream.pipe(writeStream);
  }
}

ipcMain.on("region-info", (event, regionData) => {
  store.set("readyForProcessing", false);
  store.set("region_info", regionData);
  const CURRENT_REGION_PATH = path.join(BASE_PATH, `${regionData.village}_${regionData.pincode}`);
  moveToRegion(TEMP_DIRECTORY, CURRENT_REGION_PATH, (err) => {
    if (err) {
      if (err.code === "ENOTEMPTY") {
        dialog.showErrorBox("Same Region Error", "Region Already Exists, Either Change region name or remove the Region Folder from the Base Folder");
      }
    }
    else {
      store.set("readyForProcessing", true);
    }
  });
  store.set("currentRegionPath", CURRENT_REGION_PATH);
});

const workingDir = { path: '', imageList: [] };
function getImageList(currentPath) {
  if (workingDir.path !== currentPath) {
    workingDir.path = currentPath;
    workingDir.imageList = fs.readdirSync(currentPath);
  }
  return workingDir.imageList.map((image) => `${currentPath}/${image}`);
}

ipcMain.handle("get-uploaded-images", (event) => {
  let imageList = getImageList(store.get('currentRegionPath'));
  imageList = imageList.map((img, index) => ({ 'imagePath': `file://${img}`, 'label': 'not-predicted' }))
  return { images: imageList };
});


function base64_encode(files) {
  const base64 = Array();
  for (let file of files) {
    base64.push([fromBase64(fs.readFileSync(file, 'base64'))]);
  }
  return base64;
}

async function getPredictions(data) {
  const res = await post('http://localhost:8501/v1/models/sky_detection/versions/2:predict', data, {
    headers: { "content-type": "application/json" }
  });
  return res.data.predictions;
}

function batchPredict(encodedImages) {
  let result = []
  const chunk = 20;
  const data = {
    "signature_name": "serving_default",
    "instances": encodedImages.slice(0, chunk)
  }
  let chain = getPredictions(data);
  for (let i = chunk; i < encodedImages.length; i += chunk) {
    const data = {
      "signature_name": "serving_default",
      "instances": encodedImages.slice(i, i + chunk)
    }
    chain = chain.then((res) => {
      result = result.concat(res);
      console.log(i);
      return getPredictions(data);
    }).catch((err) => { console.log(err) });
  }
  return chain.then((res) => { result = result.concat(res); console.log("over"); return result; }).catch((err) => { console.log(err) });
}

// function runService(workerData) {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker(MAIN_WINDOW_WOKRER_WEBPACK_ENTRY, { workerData });
//     worker.on('message', resolve);
//     worker.on('error', reject);
//     worker.on('exit', (code) => {
//       if (code !== 0)
//         reject(new Error(
//           `Stopped the Worker Thread with the exit code: ${code}`));
//     })
//   })
// }

ipcMain.on("start-processing", (event) => {
  const imageList = getImageList(store.get('currentRegionPath'));
  const encodedImages = base64_encode(imageList);
  // runService(imageList).then((result) => {
  //   event.sender.send('received-result', result);
  // }).catch(err => console.error(err))


  batchPredict(encodedImages).then((result) => {
    result = result.map((prediction) => {
      if (prediction[0] >= 0.5) {
        return 'clear'
      } else {
        return 'unclear'
      }
    });
    result = imageList.map((img, index) => ({ 'imagePath': `file://${img}`, 'label': result[index] }))
    // console.log(result);
    event.sender.send('received-result', result);
  }).catch((err) => { console.log(err) });
});