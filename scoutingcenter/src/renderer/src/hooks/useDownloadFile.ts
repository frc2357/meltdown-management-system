import { TDownloadFunc } from '../../types/TDownloadFunc';

export const useDownloadFile: () => TDownloadFunc = (): TDownloadFunc => {
  return ( fileName: string, fileContent: string): void => {
    window.electron.saveFile(fileName, fileContent); 
   };
};