const childProcess = require("node:child_process");

module.exports = { 
  getGitRoot: () => {
    const stdout = (
      childProcess.execSync("git rev-parse --show-toplevel").toString() || ""
    ).trimEnd();
    return stdout;
  }
};
