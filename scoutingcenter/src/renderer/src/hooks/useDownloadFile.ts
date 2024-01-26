import { TDownloadFunc } from "../../types/TDownloadFunc";

export const useDownloadFile: () => TDownloadFunc = (): TDownloadFunc => {

  return (fileContent: string, fileName: string) => {
    const element = document.createElement("a");
    const file = new Blob([fileContent], {type: "text/plain"});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    element.click();
  
  }
}