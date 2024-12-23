import { TLogStructure } from '.';
import { TLog } from '../../common/types';

export type TFileManager = {
  createBaseDirs: () => Promise<void>;
  unzipAssignment: (assignmentB64: string) => Promise<string>;
  unzipB64: (inputB64: string, outFilePath: string, fileName: string) => Promise<string>;
  saveLog: <eventType>(log: TLog<eventType>) => Promise<string>;
  getZippedLog: (path: string) => Promise<string>;
  getEventLogInfo: (eventName: string) => Promise<{ name: string; path: string }[]>;
  getLogStructure: () => Promise<TLogStructure>;
  deleteFile: (path: string) => Promise<void>;
  getLastMatchNumber: (eventName: string) => Promise<number>;
};
