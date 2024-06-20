import {
  app,
  BrowserWindow,
} from 'electron';
import path from 'node:path';
import electronSquirrelStartup from 'electron-squirrel-startup';

if (electronSquirrelStartup) app.quit();

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, '../preload/preload.js'),
    },
    icon: path.join(__dirname, './assets/logo.png'),
  });

  // Vite dev server URL
  mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`); //'http://localhost:5173');
  mainWindow.on('closed', (): null => (mainWindow = null));
}

app.whenReady().then((): void => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});