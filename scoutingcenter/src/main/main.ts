import { app, BrowserWindow, dialog, ipcMain, IpcMainEvent, SaveDialogReturnValue } from 'electron';
import path from "node:path"
import fs from "node:fs"
import { TFullAssignment, TFullAssignmentMatch, TTabletAssignment } from '../renderer/types';
import AdmZip from 'adm-zip';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  console.log(path.join(__dirname, '../preload/preload.js' ))
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, '../preload/preload.js' )
    }
  });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
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

ipcMain.on('saveFile', async (event: IpcMainEvent, fileName: string, fileContent: string): Promise<void> => {
  const saveInfo: SaveDialogReturnValue = await dialog.showSaveDialog({
    title: 'Download File',
    defaultPath: `${app.getPath('documents')}/${fileName}`,
    filters: [
      { name: 'csv', extensions: ['csv', 'txt'] }],
      
  });

  console.log(JSON.stringify(saveInfo))
  if (saveInfo.canceled || saveInfo.filePath === undefined) {
    return;
  }

  fs.writeFileSync(saveInfo.filePath, fileContent);
})

ipcMain.handle('openAssignment', async (): Promise<string[]|null> => {
  const openInfo = await dialog.showOpenDialog({
    title: 'Open Assignment',
    defaultPath: app.getPath('documents'),
    properties: ['openFile'],
    filters: [
      {name: 'csv', extensions: ['csv', 'txt']}
    ]
  });

  if(openInfo.canceled || openInfo.filePaths.length === 0) {
    return null
  }

  const event: string = openInfo.filePaths[0].split('\\').pop()?.slice(0, -4) ?? "";
  console.log(`event: ${event}`)

  const assignmentCsv: string = fs.readFileSync(openInfo.filePaths[0], {
    encoding: 'utf-8'
  });

  const rows: string[] = assignmentCsv.split('\n');

  rows.shift();

  const tabletAssignments: TTabletAssignment[] = [
    {
      event,
      alliance: 'RED',
      alliancePos: '1',
      matches: []
    },
    {
      event,
      alliance: 'RED',
      alliancePos: '2',
      matches: []
    },
    {
      event,
      alliance: 'RED',
      alliancePos: '3',
      matches: []
    },
    {
      event,
      alliance: 'BLUE',
      alliancePos: '1',
      matches: []
    },
    {
      event,
      alliance: 'BLUE',
      alliancePos: '2',
      matches: []
    },
    {
      event,
      alliance: 'BLUE',
      alliancePos: '3',
      matches: []
    },
  ]


  rows.forEach((row: string): void => {
    const fields: string[] = row.split(',');

    const matchNum: number = Number(fields[0]);

    for(let i: number = 0; i<12; i+=2) {
      tabletAssignments[i/2].matches.push(
        {
          matchNum: matchNum,
          teamNum: Number(fields[i+1]),
          scouter: fields[i+2]
        }
      )
    }    
  })


//console.log(JSON.stringify(tabletAssignments, null, 1))
  const zippedAssignments: string[] = tabletAssignments.map((tabletAssignment: TTabletAssignment, index): any => {
    const zip = new AdmZip();
    const buffer: Buffer = Buffer.from(JSON.stringify(tabletAssignment), 'utf-8')
    console.log(buffer.length)
    zip.addFile('assignment/assignment.txt', buffer);
  
    zip.writeZip(path.resolve(__dirname, "test"));
    console.log("INDEX: "+index);
    const test = zip.toBuffer();
    console.log(test.toString('ascii'))
    const result = test.toString('base64').slice(0, 500);
    console.log(result);
    return result
  }) 

  //console.log(zippedAssignments)
   return zippedAssignments;
  //return tabletAssignments.map((elem) => JSON.stringify(elem).slice(0, 500))
}) 