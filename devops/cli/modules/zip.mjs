import archiver from "archiver";
import fs from "node:fs";

export default {
  zipFolder: async (sourceFolder, outputFile, globPattern = "**/*") => {
    if(!fs.existsSync(sourceFolder)) throw new Error(`Source folder not found: ${sourceFolder}`);
    
    if (fs.existsSync(outputFile)) fs.rmSync(outputFile);

    const archive = new archiver("zip", { zlib: { level: 1 } });
    const outputStream = fs.createWriteStream(outputFile, { autoClose: true });
    let isZipDone = false;

    outputStream.on("close", () => (isZipDone = true));
    outputStream.on("end", () => (isZipDone = true));

    archive.pipe(outputStream);
    archive.glob(globPattern, { cwd: sourceFolder });
    archive.finalize();

    return new Promise((resolve, reject) => {
      const waiter = () => {
        if(isZipDone) {
          resolve(archive.pointer());
        } else {
          setTimeout(waiter, 100);
        }
      }
      waiter();
    });
  }
}

