import fs from 'react-native-fs';
import { unzip, zip } from 'react-native-zip-archive';
import { TLog, TLogStructure } from '../../types';
import { useAssignment } from '../contexts/AssignmentContext';

export const useFileManager = () => {
  const { event } = useAssignment();

  const logsRoot = `${fs.DocumentDirectoryPath}/logs`;
  const logsEvent = `${logsRoot}/${event}`;
  const unzippedLogsPath = `${logsEvent}/unzipped`;
  const zippedLogsPath = `${logsEvent}/zipped`;
  const tempPath = `${fs.DocumentDirectoryPath}/temp`;
  const assignmentFilePath = `${fs.DocumentDirectoryPath}/assignment/assignment.txt`;

  const createBaseDirs = async (): Promise<void> => {
    const promises: Promise<void>[] = [];
    promises.push(fs.mkdir(logsRoot));
    promises.push(fs.mkdir(tempPath));

    await Promise.all(promises);
  };

  const saveLog = async (log: TLog): Promise<string> => {
    const fileName: string = `${log.alliance}-${log.alliancePos}-match-${log.matchNum}`;
    const logString: string = JSON.stringify(log);

    await fs.mkdir(unzippedLogsPath);
    await fs.mkdir(zippedLogsPath);

    await fs.writeFile(`${unzippedLogsPath}/${fileName}`, logString);

    await zip([`${unzippedLogsPath}/${fileName}`], `${zippedLogsPath}/${fileName}`);
    await fs.unlink(`${unzippedLogsPath}/${fileName}`);

    return `${zippedLogsPath}/${fileName}`;
  };

  const getZippedLog = async (path: string): Promise<string> => {
    return await fs.readFile(path, 'ascii');
  };

  const deleteFile = async (path: string): Promise<void> => {
    await fs.unlink(path);
  };

  const unzipAscii = async (inputAscii: string, outFilePath: string): Promise<string> => {
    const tempZip: string = `${tempPath}/t.zip`;

    await fs.writeFile(tempZip, inputAscii, 'ascii');
    await unzip(tempZip, outFilePath, 'US-ASCII');
    await fs.unlink(tempZip);

    const output: string = await fs.readFile(outFilePath);

    return output;
  };

  const getLogStructure = async (): Promise<TLogStructure> => {
    const eventDirs = await fs.readDir(logsRoot);

    const logStructure: TLogStructure = eventDirs
      .filter((dir) => dir.isDirectory)
      .reduce((structure: TLogStructure, eventDir) => ({ ...structure, [eventDir.name]: [] }), {});

    for (const event in logStructure) {
      logStructure[event] = await getEventLogInfo(event);
    }

    return logStructure;
  };

  const getEventLogInfo = async (eventName: string): Promise<TLogStructure['event']> => {
    const files = await fs.readDir(`${logsRoot}/${eventName}/zipped`);

    const logInfo: TLogStructure['event'] = files
      .filter((file) => file.isFile)
      .map((file) => ({ name: file.name, path: file.path }));

    return logInfo;
  };

  const unzipAssignment = async (assignmentAscii: string): Promise<string> => {
    return await unzipAscii(assignmentAscii, assignmentFilePath);
  };

  return {
    createBaseDirs,
    unzipAssignment,
    unzipAscii,
    saveLog,
    getZippedLog,
    getEventLogInfo,
    getLogStructure,
    deleteFile,
  };
};
