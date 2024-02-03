import fs, { ReadDirItem } from 'react-native-fs';
import { unzip, zip } from 'react-native-zip-archive';
import { TFileManager, TLog, TLogStructure } from '../../types';
import { useAssignment } from '../contexts/AssignmentContext';

export const useFileManager: () => TFileManager = (): TFileManager => {
  const { event } = useAssignment();

  const logsRoot = `${fs.DocumentDirectoryPath}/logs`;
  const logsEvent = `${logsRoot}/${event}`;
  const unzippedLogsPath = `${logsEvent}/unzipped`;
  const zippedLogsPath = `${logsEvent}/zipped`;
  const tempPath = `${fs.DocumentDirectoryPath}/temp`;
  const assignmentFilePath = `${fs.DocumentDirectoryPath}/assignment`;

  const createBaseDirs: TFileManager['createBaseDirs'] = async (): Promise<void> => {
    const promises: Promise<void>[] = [];
    promises.push(fs.mkdir(logsRoot));
    promises.push(fs.mkdir(tempPath));

    await Promise.all(promises);
  };

  const saveLog: TFileManager['saveLog'] = async (log: TLog): Promise<string> => {
    const fileName: string = `${log.alliance}-${log.alliancePos}-match-${log.matchNum}`;
    const logString: string = JSON.stringify(log);

    await fs.mkdir(unzippedLogsPath);
    await fs.mkdir(zippedLogsPath);

    await fs.writeFile(`${unzippedLogsPath}/${fileName}`, logString);

    await zip([`${unzippedLogsPath}/${fileName}`], `${zippedLogsPath}/${fileName}`);
    await fs.unlink(`${unzippedLogsPath}/${fileName}`);

    return `${zippedLogsPath}/${fileName}`;
  };

  const getZippedLog: TFileManager['getZippedLog'] = async (path: string): Promise<string> => {
    return await fs.readFile(path, 'base64');
  };

  const deleteFile: TFileManager['deleteFile'] = async (path: string): Promise<void> => {
    await fs.unlink(path);
  };

  const unzipB64: TFileManager['unzipB64'] = async (
    inputB64: string,
    outFilePath: string,
    fileName: string
  ): Promise<string> => {
    const tempZip: string = `${tempPath}/t.zip`;
    await fs.writeFile(tempZip, inputB64, 'base64');
    await unzip(tempZip, outFilePath, 'US-ASCII');
    await fs.unlink(tempZip);

    const output: string = await fs.readFile(`${outFilePath}/${fileName}`);

    return output;
  };

  const getLogStructure: TFileManager['getLogStructure'] = async (): Promise<TLogStructure> => {
    const eventDirs: ReadDirItem[] = await fs.readDir(logsRoot);

    const logStructure: TLogStructure = eventDirs
      .filter((dir: ReadDirItem): (() => boolean) => dir.isDirectory)
      .reduce(
        (structure: TLogStructure, eventDir: ReadDirItem): TLogStructure => ({
          ...structure,
          [eventDir.name]: [],
        }),
        {}
      );

    for (const event in logStructure) {
      logStructure[event] = await getEventLogInfo(event);
    }

    return logStructure;
  };

  const getEventLogInfo: TFileManager['getEventLogInfo'] = async (
    eventName: string
  ): Promise<TLogStructure['event']> => {
    const files: ReadDirItem[] = await fs.readDir(`${logsRoot}/${eventName}/zipped`);

    const logInfo: TLogStructure['event'] = files
      .filter((file: ReadDirItem): (() => boolean) => file.isFile)
      .map((file: ReadDirItem): { name: string; path: string } => ({
        name: file.name,
        path: file.path,
      }));

    return logInfo;
  };

  const unzipAssignment: TFileManager['unzipAssignment'] = async (
    assignmentB64: string
  ): Promise<string> => {
    return await unzipB64(assignmentB64, assignmentFilePath, 'assignment.txt');
  };

  return {
    createBaseDirs,
    unzipAssignment,
    unzipB64,
    saveLog,
    getZippedLog,
    getEventLogInfo,
    getLogStructure,
    deleteFile,
  };
};
