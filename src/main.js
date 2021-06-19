const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const Store = require('electron-store');
import axios from 'axios';
import base64url from 'base64url';
import { readdir } from 'fs/promises';
const { Worker } = require('worker_threads');


const isDev = process.env.NODE_ENV === "development";

/**
 * Specifies the schema for the electron store
 */
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
if (require('electron-squirrel-startup')) {
  app.quit();
}

const BASE_PATH = store.get('basePath');
const TEMP_DIRECTORY = path.join(store.get('basePath'), '.temp')

const createWindow = () => {
  /**
   * Creates a browser window
   */
  const mainWindow = new BrowserWindow({
    webPreferences: {
      devTools: isDev,
      nodeIntegrationInWorker: true,
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  });

  mainWindow.maximize();
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  /**
   * This function handles the printing and saving the statistical report in the folder.
   */
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

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * This function creates a temporary directory for a specified path. 
 * It also creates parent folders is they don't exist
 */
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
/**
 * This sets a Base Path for the application which is to be used for storing images 
 * and result 
 */
ipcMain.on("set-base-path", () => {
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

/**
 * This function handles the copying and unzipping of the uploaded images to Base Folder.
 */
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

/**
 * This function handles copying the uploaded images to Base Folder
 */

ipcMain.on("upload-folder", async (event) => {
  setUpTempDirectory();

  const files = await dialog.showOpenDialog({
    defaultPath: store.get('basePath'),
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

/**
 * This function is responsible for moving images from temp directory to Base Folder
 */

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

/**
 * This function saves the region data into the electron store and updates the current region
 */
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

/**
 * This function gets the images from the current region directory
 */
const workingDir = { path: '', imageList: [] };
function getImageList(currentPath) {
  if (workingDir.path !== currentPath) {
    workingDir.path = currentPath;
    workingDir.imageList = fs.readdirSync(currentPath);
  }
  return workingDir.imageList.map((image) => `${currentPath}/${image}`);
}

/**
 * This function returns the list of uploaded image path
 */
ipcMain.handle("get-uploaded-images", (event) => {
  let imageList = getImageList(store.get('currentRegionPath'));
  imageList = imageList.map((img, index) => ({ 'imagePath': `file://${img}`, 'label': 'not-predicted' }))
  return { images: imageList };
});

/**
 * This function creates a worker thread which is responsible for requesting large amount of
 * images to the serving.
 */
function runService(workerData) {
  return new Promise((resolve, reject) => {
    let workerPath;
    if (isDev) {
      workerPath = "./src/utilities/requestToServing.js";
    } else {
      workerPath = path.join(process.resourcesPath, 'requestToServing.js');
    }
    const worker = new Worker(workerPath, { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(
          `Stopped the Worker Thread with the exit code: ${code}`));
    })
  })
}
/**
 * This function starts the processing of the uploaded images.
 */
ipcMain.on("start-processing", (event) => {
  const imageList = getImageList(store.get('currentRegionPath'));
  runService(imageList).then((result) => {
    event.sender.send('received-result', result);
  }).catch(err => console.error(err))
});

/**
 * This function classify a single image and gives its result
 */
ipcMain.on("classify-single", (event, image) => {
  const data = {
    "signature_name": "serving_default",
    "instances": [[base64url.fromBase64(image)]]
  }
  axios.post('http://localhost:8501/v1/models/sky_detection/versions/2:predict', data, {
    headers: { "content-type": "application/json" }
  }).then((res) => {
    let label;
    if (res.data.predictions[0] >= 0.5) {
      label = 'clear';
    } else {
      label = 'unclear';
    }
    event.sender.send('classify-single', label);
  }).catch((err) => console.log(err));
})