import { contextBridge, ipcRenderer } from 'electron';
import { EApi } from '../types/EApi';

const api: Record<string, any> = {};
for (const key in EApi) {
  api[key] = (args) => ipcRenderer.invoke(key, args);
}
contextBridge.exposeInMainWorld('api', api);
