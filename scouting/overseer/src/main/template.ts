import {
  app,
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
import { WriteStream } from 'node:original-fs';


export function template() {

}