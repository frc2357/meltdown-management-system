import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent, SaveDialogReturnValue } from 'electron';
import path from "node:path"
import fs from "node:fs"

let mainWindow: BrowserWindow | null;

function createWindow() {
  console.log(path.join(__dirname, '../preload/preload.js' ))
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/preload.js' )
    }
  });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => (mainWindow = null));
}

app.whenReady().then(() => {
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

ipcMain.on('saveFile', async (event: IpcMainEvent, fileName: string, fileContent: string) => {
  const saveInfo: SaveDialogReturnValue = await dialog.showSaveDialog({
    title: 'Download File',
    defaultPath: `${app.getPath('documents')}/${fileName}`,
  });

  console.log(JSON.stringify(saveInfo))
  if (saveInfo.canceled || saveInfo.filePath === undefined) {
    return;
  }

  fs.writeFileSync(saveInfo.filePath, fileContent);
})
