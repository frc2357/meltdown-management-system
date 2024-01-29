import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  saveFile: (fileName: string, fileContent: string): void => {
    console.log('HIT');
    ipcRenderer.send('saveFile', fileName, fileContent);
  },
  openAssignment: async (): Promise<string[] | null> => {
    console.log('In open');
    const result = await ipcRenderer.invoke('openAssignment');
    console.log(result);
    return result;
  },
});
