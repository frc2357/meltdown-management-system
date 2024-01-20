import fs from 'react-native-fs';
import { unzip, zip } from 'react-native-zip-archive';
import { TLog } from '../../types';
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

  const createEventDirs = async (): Promise<void> => {
    const promises: Promise<void>[] = [];
    promises.push(fs.mkdir(unzippedLogsPath));
    promises.push(fs.mkdir(zippedLogsPath));
    promises.push(fs.mkdir(tempPath));

    await Promise.all(promises);
  };

  const saveLog = async (log: TLog): Promise<string> => {
    const fileName: string = `${log.alliance}-${log.alliancePos}-match-${log.teamNum}`;
    const logString: string = JSON.stringify(log);

    await fs.writeFile(`${unzippedLogsPath}/${fileName}`, logString);

    await zip([`${unzippedLogsPath}/${fileName}`], `${zippedLogsPath}/${fileName}`);

    const output = await fs.readFile(`${zippedLogsPath}/${fileName}`, 'ascii');

    return output;
  };

  const unzipAscii = async (inputAscii: string, outFilePath: string): Promise<string> => {
    const tempZip: string = `${tempPath}/t.zip`;

    await fs.writeFile(tempZip, inputAscii, 'ascii');
    await unzip(tempZip, outFilePath, 'US-ASCII');
    await fs.unlink(tempZip);

    const output: string = await fs.readFile(outFilePath);

    return output;
  };

  const unzipAssignment = async (assignmentAscii: string): Promise<string> => {
    return await unzipAscii(assignmentAscii, assignmentFilePath);
  };

  return {
    createBaseDirs,
    createEventDirs,
    unzipAssignment,
    unzipAscii,
    saveLog,
  };
};
