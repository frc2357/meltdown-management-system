module.exports = {
  packagerConfig: {
    ignore: [
      /^\/src/,
      /^\/node_modules/,
      /^\/out/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)|(.eslintignore)|(.prettierignore)|(.prettierrc.json)|(vite.config.mts)/,
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
