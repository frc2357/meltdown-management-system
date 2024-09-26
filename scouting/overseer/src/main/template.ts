import { IpcMainInvokeEvent, app, ipcMain } from 'electron';
import { EApi } from '../types';
import path from 'node:path';
import fs from 'node:fs';

export function template() {
  ipcMain.handle(EApi.getTemplates, async (): Promise<string[]> => {
    const templatePath: string = path.resolve(app.getPath('userData'), 'templates');

    if (!fs.existsSync(templatePath)) {
      fs.mkdirSync(templatePath);
    }

    const templateNames = fs.readdirSync(templatePath);

    return templateNames;
  });

  ipcMain.handle(
    EApi.createTemplate,
    async (_event: IpcMainInvokeEvent, { name }: { name: string }): Promise<boolean> => {
      const allTemplatePath: string = path.resolve(app.getPath('userData'), 'templates');

      if (!fs.existsSync(allTemplatePath)) {
        fs.mkdirSync(allTemplatePath);
      }

      const templatePath = path.resolve(allTemplatePath, name);
      fs.mkdirSync(templatePath);

      return fs.statSync(templatePath).isDirectory();
    }
  );
}
