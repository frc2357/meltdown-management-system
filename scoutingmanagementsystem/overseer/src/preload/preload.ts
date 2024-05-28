import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  exportMatches: (): void => {
    ipcRenderer.send('exportMatches');
  },
  saveFile: (fileName: string, fileContent: string): void => {
    ipcRenderer.send('saveFile', fileName, fileContent);
  },
  openAssignment: async (): Promise<string | null> => {
    const result = await ipcRenderer.invoke('openAssignment');
    return result;
  },
  handleScan: async (b64: string): Promise<boolean> => {
    return await ipcRenderer.invoke('handleScan', b64);
  },
});
