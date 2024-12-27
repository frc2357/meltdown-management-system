const {getGitRoot} = require("../modules/git.js");
const commandLineArgs = require("command-line-args");
const path = require("node:path");
const {setPackageJsonVersion, setExpoAppVersion} = require("../modules/version.js");

const getConfiguration = async () => {
  const gitRoot = getGitRoot();
  const optionDefinitions = [
    { name: "version", type: String, defaultOption: true },
  ];

  const options = commandLineArgs(optionDefinitions);
  
  const version = options["version"];
  const configuration = {
    version,
    gitRoot
  };

  return configuration;
};

(async () => {
  const configuration = await getConfiguration();
  console.log(`Update Version to ${configuration.version}`);

  console.log("====================");

  console.log(`Update package.json in Overseer`);
  setPackageJsonVersion(path.resolve(configuration.gitRoot, "scouting", "overseer"), configuration.version);

  console.log(`Update package.json in Sentinel`);
  setPackageJsonVersion(path.resolve(configuration.gitRoot, "scouting", "sentinel"), configuration.version);

  console.log(`Update app.json in Sentinel`);
  setExpoAppVersion(path.resolve(configuration.gitRoot, "scouting", "sentinel"), configuration.version);

  console.log("====================");
})();
