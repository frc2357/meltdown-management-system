import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  saveFile: (fileName: string, fileContent: string): void => {
    ipcRenderer.send('saveFile', fileName, fileContent);
  },
  openAssignment: async (): Promise<string[] | null> => {
    const result = await ipcRenderer.invoke('openAssignment');
    console.log(result);
    return result;
  },
  handleScan: async (b64: string): Promise<boolean> => {
    return await ipcRenderer.invoke('handleScan', b64);
  },
});
