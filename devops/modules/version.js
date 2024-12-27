const fs = require("node:fs");
const path = require("node:path");

module.exports = {
  setPackageJsonVersion: (projectPath, version) => {
    const packageJson = path.resolve(projectPath, "package.json");
    const json = fs.readFileSync(path.resolve(packageJson), "utf-8");
    const packageJsonObj = JSON.parse(json);
    packageJsonObj.version = version;
    fs.writeFileSync(packageJson, JSON.stringify(packageJsonObj, null, 2));
},
  setExpoAppVersion: (projectPpath, version) => {
    const appJson = path.resolve(projectPpath, "app.json");
    const json = fs.readFileSync(path.resolve(appJson), "utf-8");
    const appJsonObj = JSON.parse(json);
    appJsonObj.expo.version = version;
    fs.writeFileSync(appJson, JSON.stringify(appJsonObj, null, 2));
  }
}