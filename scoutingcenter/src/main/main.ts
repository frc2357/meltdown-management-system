import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  IpcMainEvent,
  IpcMainInvokeEvent,
  SaveDialogReturnValue,
} from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { TDenseEvent, TDenseLog, TEvent, TLog, TTabletAssignment } from '../types';
import AdmZip, { IZipEntry } from 'adm-zip';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import isDev from 'electron-is-dev';

let mainWindow: BrowserWindow | null;
let eventName: string = '';
let matchLogPath: string = '';

function createWindow(): void {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, '../preload/preload.js'),
    },
    icon: path.join(__dirname, './assets/logo.png'),
  });

  console.log(isDev);

  // Vite dev server URL
  mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/index.html')}`);
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

ipcMain.on('exportMatches', async (): Promise<void> => {
  const saveInfo: SaveDialogReturnValue = await dialog.showSaveDialog({
    title: 'Download File',
    defaultPath: `${app.getPath('documents')}/${eventName}`,
    filters: [{ name: 'csv', extensions: ['csv', 'txt'] }],
  });

  const savePath: string | undefined = saveInfo.filePath;
  if (saveInfo.canceled || savePath === undefined) {
    return;
  }

  const pythonProcess: ChildProcessWithoutNullStreams = spawn('python', [
    './src/main/python/exportMatches.py',
    savePath,
    matchLogPath,
  ]);
  pythonProcess.on('error', (err: Error) => {
    console.log(JSON.stringify(err));
  });
  pythonProcess.stdout.on('data', (data: Buffer) => {
    console.log(`Data from stdout: ${data.toString()}`);
  });
  pythonProcess.stderr.on('data', (data: Buffer) =>
    console.log(`Data from stdout: ${data.toString()}`)
  );
  pythonProcess.stdout.on('error', (err: Error) => console.log(`ERROR ${JSON.stringify(err)}`));
  pythonProcess.stderr.on('error', (err: Error) => console.log(`ERROR ${JSON.stringify(err)}`));
});

ipcMain.on(
  'saveFile',
  async (event: IpcMainEvent, fileName: string, fileContent: string): Promise<void> => {
    const saveInfo: SaveDialogReturnValue = await dialog.showSaveDialog({
      title: 'Download File',
      defaultPath: `${app.getPath('documents')}/${fileName}`,
      filters: [{ name: 'csv', extensions: ['csv', 'txt'] }],
    });

    if (saveInfo.canceled || saveInfo.filePath === undefined) {
      return;
    }

    fs.writeFileSync(saveInfo.filePath, fileContent);
  }
);

ipcMain.handle('handleScan', async (event: IpcMainInvokeEvent, b64: string): Promise<boolean> => {
  try {
    const zip = new AdmZip(Buffer.from(b64, 'base64'));
    const entries: IZipEntry[] = zip.getEntries();

    entries.forEach((entry: IZipEntry): void => {
      const text: string = zip.readAsText(entry);

      const denseLog: TDenseLog = JSON.parse(text);
      const log: TLog = {
        teamNum: denseLog.t,
        matchNum: denseLog.m,
        events: [],
        scouter: denseLog.s,
        alliance: denseLog.a,
        alliancePos: denseLog.p,
      };

      log.events = denseLog.e.map((denseEvent: TDenseEvent): TEvent => {
        let event: TEvent = {};

        for (const prop in denseEvent) {
          switch (prop) {
            case 't':
              event.type = denseEvent.t;
              break;
            case 'c':
              event.timestamp = denseEvent.c;
              break;
            case 'l':
              event.location = denseEvent.l;
              break;
            case 'x':
              event.x = denseEvent.x;
              break;
            case 'y':
              event.y = denseEvent.y;
              break;
            case 'o':
              event.leave = denseEvent.o;
              break;
            case 'n':
              event.notes = denseEvent.n;
              break;
            case 'h':
              event.harmony = denseEvent.h;
              break;
            case 's':
              event.spotlit = denseEvent.s;
              break;
            case 'r':
              event.trap = denseEvent.r;
              break;
            case 'm':
              event.miss = denseEvent.m;
              break;
          }
        }
        return event;
      });

      const logString: string = JSON.stringify(log);
      const filePath: string = path.resolve(matchLogPath, `${entry.name}.json`);
      fs.writeFileSync(filePath, logString);
    });
  } catch (err: any) {
    console.log(`ERROR SAVING FILE: ${err}`);
    return false;
  }
  return true;
});

ipcMain.handle('openAssignment', async (): Promise<string | null> => {
  const openInfo = await dialog.showOpenDialog({
    title: 'Open Assignment',
    defaultPath: app.getPath('documents'),
    properties: ['openFile'],
    filters: [{ name: 'csv', extensions: ['csv', 'txt'] }],
  });

  if (openInfo.canceled || openInfo.filePaths.length === 0) {
    return null;
  }

  eventName = openInfo.filePaths[0].split('\\').pop()?.slice(0, -4) ?? '';
  matchLogPath = path.resolve(app.getPath('documents'), 'matchLog', eventName);
  fs.mkdirSync(matchLogPath, { recursive: true });

  const assignmentCsv: string = fs.readFileSync(openInfo.filePaths[0], {
    encoding: 'utf-8',
  });

  const rows: string[] = assignmentCsv.split('\n');

  rows.shift();

  const tabletAssignments: TTabletAssignment[] = [
    {
      e: eventName,
      a: 'RED',
      ap: '1',
      m: [],
    },
    {
      e: eventName,
      a: 'RED',
      ap: '2',
      m: [],
    },
    {
      e: eventName,
      a: 'RED',
      ap: '3',
      m: [],
    },
    {
      e: eventName,
      a: 'BLUE',
      ap: '1',
      m: [],
    },
    {
      e: eventName,
      a: 'BLUE',
      ap: '2',
      m: [],
    },
    {
      e: eventName,
      a: 'BLUE',
      ap: '3',
      m: [],
    },
  ];

  rows.forEach((row: string): void => {
    const fields: string[] = row.split(',');

    const matchNum: number = Number(fields[0]);

    for (let i: number = 0; i < 12; i += 2) {
      tabletAssignments[i / 2].m.push({
        m: matchNum,
        t: Number(fields[i + 1]),
        s: fields[i + 2],
      });
    }
  });

  const zippedAssignments: string[] = tabletAssignments.map(
    (tabletAssignment: TTabletAssignment, index): any => {
      const zip = new AdmZip();
      const buffer: Buffer = Buffer.from(JSON.stringify(tabletAssignment), 'utf-8');
      zip.addFile('assignment.txt', buffer);

      zip.writeZip(path.resolve(__dirname, 'test'));
      return zip.toBuffer().toString('base64');
    }
  );

  return JSON.stringify(zippedAssignments);
});
