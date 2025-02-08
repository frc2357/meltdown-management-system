import childProcess from "node:child_process";

export default { 
  getGitRoot: () => {
    const stdout = (
      childProcess.execSync("git rev-parse --show-toplevel").toString() || ""
    ).trimEnd();
    return stdout;
  }
};
