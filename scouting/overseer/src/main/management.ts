import { app, dialog, ipcMain, IpcMainInvokeEvent, SaveDialogReturnValue } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { TDenseEvent, TDenseLog, TEvent, TLog, TTabletAssignment, EApi } from '../types';
import AdmZip, { IZipEntry } from 'adm-zip';
import { WriteStream } from 'node:original-fs';

export function management() {
  let eventName: string = '';
  let matchLogPath: string = '';

  ipcMain.handle(EApi.exportMatches, async (): Promise<void> => {
    const saveInfo: SaveDialogReturnValue = await dialog.showSaveDialog({
      title: 'Download File',
      defaultPath: `${app.getPath('documents')}/${eventName}`,
      filters: [{ name: 'csv', extensions: ['csv', 'txt'] }],
    });

    const savePath: string | undefined = saveInfo.filePath;
    if (saveInfo.canceled || savePath === undefined) {
      return;
    }

    const fileNames: string[] = fs.readdirSync(matchLogPath);

    const matches: TLog[] = fileNames.map((fileName: string): TLog => {
      const jsonBuffer: Buffer = fs.readFileSync(path.resolve(matchLogPath, fileName));
      const jsonString: string = jsonBuffer.toString();
      return JSON.parse(jsonString);
    });

    matches.sort((a: TLog, b: TLog): number => {
      if (a.matchNum > b.matchNum) {
        return 1;
      }

      if (a.matchNum < b.matchNum) {
        return -1;
      }

      if (a.alliance.toUpperCase() === 'BLUE' && b.alliance.toUpperCase() === 'RED') {
        return 1;
      }

      if (a.alliance.toUpperCase() === 'RED' && b.alliance.toUpperCase() === 'BLUE') {
        return -1;
      }

      if (a.alliancePos > b.alliancePos) {
        return 1;
      }

      if (a.alliancePos < b.alliancePos) {
        return -1;
      }

      return 0;
    });

    const repetitiveHeaders: Array<keyof TLog> = ['matchNum', 'alliance', 'alliancePos', 'teamNum'];
    const eventHeaders: Array<keyof TEvent> = [
      'type',
      'timestamp',
      'location',
      'x',
      'y',
      'leave',
      'notes',
      'harmony',
      'spotlit',
      'trap',
      'miss',
    ];
    const headers: string[] = (repetitiveHeaders as string[]).concat(eventHeaders as string[]);

    const stream: WriteStream = fs.createWriteStream(savePath);

    stream.write(headers.join(',') + '\n');

    matches.forEach((match: TLog) => {
      match.events.forEach((event: TEvent): void => {
        const row: unknown[] = [];

        repetitiveHeaders.forEach((header: keyof TLog): number => row.push(match[header] ?? ''));

        eventHeaders.forEach((header: keyof TEvent): number => row.push(event[header] ?? ''));

        stream.write(row.join(',') + '\n');
      });
    });

    stream.end();
  });

  ipcMain.handle(
    EApi.saveFile,
    async (
      _event: IpcMainInvokeEvent,
      { fileName, fileContent }: { fileName: string; fileContent: string }
    ): Promise<void> => {
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

  ipcMain.handle(
    EApi.handleScan,
    async (event: IpcMainInvokeEvent, { b64 }: { b64: string }): Promise<boolean> => {
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
            const event: TEvent = {};

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
      } catch (err: unknown) {
        console.log(`ERROR SAVING FILE: ${err}`);
        return false;
      }
      return true;
    }
  );

  ipcMain.handle(EApi.openAssignment, async (): Promise<string | null> => {
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
      (tabletAssignment: TTabletAssignment): string => {
        const zip = new AdmZip();
        const buffer: Buffer = Buffer.from(JSON.stringify(tabletAssignment), 'utf-8');
        zip.addFile('assignment.txt', buffer);

        zip.writeZip(path.resolve(__dirname, 'test'));
        return zip.toBuffer().toString('base64');
      }
    );

    return JSON.stringify(zippedAssignments);
  });
}
