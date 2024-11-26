import { IpcMainInvokeEvent, app, ipcMain } from 'electron';
import { EApi } from '../types';
import path from 'node:path';
import fs from 'node:fs';

export function template() {
  const getTemplateBaseDir: () => string = (): string => {
    const allTemplatePath: string = path.resolve(app.getPath('userData'), 'templates');

    if (!fs.existsSync(allTemplatePath)) {
      fs.mkdirSync(allTemplatePath);
    }

    return allTemplatePath;
  };

  ipcMain.handle(EApi.getTemplates, async (): Promise<string[]> => {
    const templateNames = fs.readdirSync(getTemplateBaseDir());

    return templateNames;
  });

  ipcMain.handle(
    EApi.createTemplate,
    async (_event: IpcMainInvokeEvent, { name }: { name: string }): Promise<boolean> => {
      const templatePath = path.resolve(getTemplateBaseDir(), name);
      fs.mkdirSync(templatePath);

      return fs.statSync(templatePath).isDirectory();
    }
  );

  ipcMain.handle(
    EApi.copyTemplate,
    async (
      _event: IpcMainInvokeEvent,
      { oldName, newName }: { oldName: string; newName: string }
    ): Promise<boolean> => {
      const baseDir = getTemplateBaseDir();
      const oldPath = path.resolve(baseDir, oldName);
      const newPath = path.resolve(baseDir, newName);

      fs.cpSync(oldPath, newPath, { recursive: true });

      return fs.statSync(newPath).isDirectory();
    }
  );

  ipcMain.handle(
    EApi.deleteTemplate,
    async (_event: IpcMainInvokeEvent, { name }: { name: string }): Promise<boolean> => {
      const toDelete = path.resolve(getTemplateBaseDir(), name);

      fs.rmdirSync(toDelete);

      return true;
    }
  );
}
