'use strict'

import { app, protocol, BrowserWindow ,ipcMain } from 'electron'

import  {autoUpdater} from "electron-updater";
// const autoUpdater = updater.autoUpdater;
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ 
      minWidth :1080, 
      minHeight :720,
      autoHideMenuBar :true,
      center : true,
      show: true, 
      webPreferences: {
        nodeIntegration: true
      } 
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST){ 
      win.webContents.openDevTools()
      require('vue-devtools').install()
    }
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.maximize()
  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }

  }else{
    autoUpdater.checkForUpdates()
  }
  
  
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}


ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('update-available-test', (event,data) => {
  if(data == 1){
    event.sender.send('update_available',{text:'Hay una nueva actualizacion disponible!',view:true,type:'warning',viewButtonReinicio:false});
  }

  if(data == 2){
    event.sender.send('update-downloaded',{text:'La actualizacion ha terminado de descargar',view:true,type:'success',viewButtonReinicio:true});
  }
  
  
});

ipcMain.on('restart_app', () => {
  // console.log('restart')
  // app.relaunch()
  // app.exit()
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-available', () => { 
  event.sender.send('update_available',{text:'Hay una nueva actualizacion disponible!',view:true,type:'warning',viewButtonReinicio:false});
});

autoUpdater.on('update-downloaded', function (info) {
  event.sender.send('update_downloaded',{text:'La actualizacion ha terminado de descargar',view:true,type:'success',viewButtonReinicio:true});
});



///////////////////
// Auto upadater //
///////////////////
// autoUpdater.requestHeaders = { "PRIVATE-TOKEN": "Fr5kt3Hs3Uy_Lsz4uX-x" };
// autoUpdater.autoDownload = true;

// autoUpdater.setFeedURL({
//     provider: "generic",
//     url: "https://gitlab.com/eduardoitoeste/iea-panel/-/jobs/artifacts/master/raw/dist?job=build"
// });

// autoUpdater.on('checking-for-update', function () {
//     sendStatusToWindow('Checking for update...');
// });

// autoUpdater.on('update-available', function (info) {
//     sendStatusToWindow('Update available.');
// });

// autoUpdater.on('update-not-available', function (info) {
//     sendStatusToWindow('Update not available.');
// });

// autoUpdater.on('error', function (err) {
//     sendStatusToWindow('Error in auto-updater.');
// });

// autoUpdater.on('download-progress', function (progressObj) {
//     let log_message = "Download speed: " + progressObj.bytesPerSecond;
//     log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
//     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//     sendStatusToWindow(log_message);
// });

// autoUpdater.on('update-downloaded', function (info) {
//     sendStatusToWindow('Update downloaded; will install in 1 seconds');
// });

// autoUpdater.on('update-downloaded', function (info) {
//     setTimeout(function () {
//         autoUpdater.quitAndInstall();
//     }, 1000);
// });

// autoUpdater.checkForUpdates();

// function sendStatusToWindow(message) {
//     console.log(message);
// }
