
import { GetFunctionConfigurationCommand, LambdaClient, UpdateFunctionCodeCommand } from "@aws-sdk/client-lambda";
import fs from "node:fs/promises";
import git from "./git.mjs";
import path from "node:path";

const getFunctionConfiguration = async (functionName) => {
    const clientConfiguration = {};
    const client = new LambdaClient(clientConfiguration);
    const functionConfiguration = await client.send(
        new GetFunctionConfigurationCommand({ FunctionName: functionName })
    );
    return functionConfiguration;
}

const updateFunctionCode = async (functionName, zipFilePath) => {
    const clientConfiguration = {};
    const client = new LambdaClient(clientConfiguration);
    const fileBytes = await fs.readFile(zipFilePath);
    
    let loopCount = 5;
    let functionConfiguration = await getFunctionConfiguration(functionName);
    while(
        functionConfiguration.LastUpdateStatus !== "Successful" &&
        loopCount-- > 0
    ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        functionConfiguration = await getFunctionConfiguration(functionName);
    }

    const updateFunctionCodeCommandInput = {
        FunctionName: functionName,
        ZipFile: fileBytes,
        Publish: false
    };

    const updateFunctionCodeCommand = new UpdateFunctionCodeCommand(updateFunctionCodeCommandInput);
    const updateFunctionCodeCommandOutput = await client.send(updateFunctionCodeCommand);
    return updateFunctionCodeCommandOutput;
}

export default {
    updateFunctionCode
}