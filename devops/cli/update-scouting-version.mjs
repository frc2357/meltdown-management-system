import git from "./modules/git.mjs";
import commandLineArgs from "command-line-args";
import path from "node:path";
import version from "./modules/version.mjs";

const getConfiguration = async () => {
  const gitRoot = git.getGitRoot();
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
  version.setPackageJsonVersion(path.resolve(configuration.gitRoot, "scouting", "overseer"), configuration.version);

  console.log(`Update package.json in Sentinel`);
  version.setPackageJsonVersion(path.resolve(configuration.gitRoot, "scouting", "sentinel"), configuration.version);

  console.log(`Update app.json in Sentinel`);
  version.setExpoAppVersion(path.resolve(configuration.gitRoot, "scouting", "sentinel"), configuration.version);

  console.log("====================");
})();
