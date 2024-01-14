import fs from 'react-native-fs';
import { unzip, zip } from 'react-native-zip-archive';

export const unzipAscii = async (inputAscii: string) => {
  const dir: string = `${fs.DocumentDirectoryPath}/temp`;
  const zipPath: string = `${dir}/t.zip`;
  const unzippedPath: string = `${dir}/unzipped`;
  const outFile: string = `${unzippedPath}/assignment.txt`;

  await fs.mkdir(dir);

  await fs.writeFile(zipPath, inputAscii, 'ascii');
  await unzip(zipPath, unzippedPath, 'US-ASCII');

  const output: string = await fs.readFile(outFile);
  
  return output;
};
