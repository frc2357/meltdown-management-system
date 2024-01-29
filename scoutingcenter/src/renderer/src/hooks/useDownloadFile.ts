import { TDownloadFunc } from '../../types/TDownloadFunc';

export const useDownloadFile: () => TDownloadFunc = (): TDownloadFunc => {
  return (fileName: string, fileContent: string): void => {
    // @ts-ignore
    window.api.saveFile(fileName, fileContent);
  };
};
