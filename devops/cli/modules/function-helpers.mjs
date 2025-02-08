import path from "node:path";
import fs from  "node:fs";
import zip from "./zip.mjs";
import aws_lambda from "./aws-lambda.mjs";

const removeOldFolders = (functionName, functionsRoot) => {
    console.log(`\t Removing dist folder for ${functionName}`);
    const distFolder = path.resolve(functionsRoot, functionName, "dist");

    if(fs.existsSync(distFolder)) fs.rmSync(distFolder, { recursive: true, force: true });
}

const zipFunction = async (functionName, functionsRoot) => {
    console.log(`\t Zipping ${functionName}`);

    const folderPath = path.resolve(functionsRoot, functionName);
    const sourceFolder = path.resolve(folderPath, "src");
    const distFolder = path.resolve(folderPath, "dist");
    fs.mkdirSync(distFolder, { recursive: true });

    const distFile = path.resolve(distFolder, `${functionName}.zip`);
    const globPattern = "**/*";
    return await zip.zipFolder(sourceFolder, distFile, globPattern);
}

const deployFunctionCode = async (functionName, functionsRoot, environment) => {
    console.log(`\t Deploying Function Code for ${functionName}`);
    const fullFunctionName = `mms-${environment}-${functionName}`;

    const zipFilePath = path.resolve(functionsRoot, functionName, "dist", `${functionName}.zip`);
    if(!fs.existsSync(zipFilePath)) throw new Error(`Zip file not found: ${zipFilePath}`);

   await aws_lambda.updateFunctionCode(fullFunctionName, zipFilePath);
}

export default {
    removeOldFolders,
    zipFunction,
    deployFunctionCode
}