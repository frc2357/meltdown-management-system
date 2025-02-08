import git from "./modules/git.mjs";
import commandLineArgs from "command-line-args";
import fs from "node:fs";
import path from "node:path";
import functionHelpers from "./modules/function-helpers.mjs";

const getConfiguration = async () => {
  const gitRoot = git.getGitRoot();
  const optionDefinitions = [
    { name: "function", type: String, multiple: true, defaultOption: true },
    { name: "all", type: Boolean },
    {name: "env", type: String, defaultValue: "dev" }
  ];

  const options = commandLineArgs(optionDefinitions);
  const functionsRoot = path.resolve(gitRoot, "functions");
  let functionNames = [];

  if (!!options["all"]) {
    functionNames = fs
      .readdirSync(functionsRoot, { withFileTypes: true })
      .filter(
        (x) =>
          x.isDirectory() &&
          x.name !== "vscode" &&
          x.name !== "node_modules" &&
          !x.name.startsWith("__") &&
          !x.name.endsWith("__")
      )
      .map((x) => x.name);
  } else {
    functionNames = options["function"]
      .map((x) => x.toLowerCase())
      .filter((value, index, arr) => {
        if (index === arr.indexOf(value)) return value;
      });
  }

  const environment = options["env"] || "dev";
  if(environment !== "prod" && environment !== "dev") throw new Error(`Invalid environment: ${environment}`);

  const configuration = {
    functionNames,
    functionsRoot,
    environment
  };

  return configuration;
};

(async () => {
  console.log("Deploy Function");
  const configuration = await getConfiguration();

  for (const functionName of configuration.functionNames) {
    console.log("====================");
    console.log(`Prepare Function ${functionName}`);

    functionHelpers.removeOldFolders(functionName, configuration.functionsRoot);
    await functionHelpers.zipFunction(functionName, configuration.functionsRoot);
    await functionHelpers.deployFunctionCode(functionName, configuration.functionsRoot, configuration.environment);

    console.log("====================");
  }
})();