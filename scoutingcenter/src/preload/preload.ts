const { contextBridge, ipcRenderer } = require('electron')
const path = require('node:path')

contextBridge.exposeInMainWorld('electron', {
  saveFile: (fileName: string, fileContent: string) => {
    console.log("HIT")
    ipcRenderer.send('saveFile', fileName, fileContent)     
  }
})