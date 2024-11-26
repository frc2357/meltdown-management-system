export type TApi = {
  exportMatches: () => Promise<void>;
  saveFile: (input: { fileName: string; fileContent: string }) => Promise<void>;
  openAssignment: () => Promise<string | null>;
  handleScan: (input: { b64: string }) => Promise<boolean>;
  isDev: () => Promise<boolean>;
  getTemplates: () => Promise<string[]>;
  createTemplate: (input: { name: string }) => Promise<boolean>;
  deleteTemplate: (input: { name: string }) => Promise<boolean>;
  copyTemplate: (input: { oldName: string; newName: string }) => Promise<boolean>;
};
