import archiver from "archiver";
import fs from "node:fs";

export default {
  zipFolder: async (sourceFolder, outputFile, globPattern = "**/*") => {
    if (fs.existsSync(outputFile)) fs.rmSync(outputFile);
    const outputStream = fs.createWriteStream(outputFile, { autoClose: true });
    const archive = new archiver("zip", { zlib: { level: 1 } });
    archive.pipe(outputStream);
    archive.glob(globPattern, { cwd: sourceFolder });
    return archive.finalize();
  }
}

