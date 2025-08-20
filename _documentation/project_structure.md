# Project Structure
This is to provide a base understanding of the file structure of this repo.

The primary projects are located in the `pitmanagementsystem` and `scouting` folders.

## _documentation
Where you can find documentation files like thi one to help understand the project.

## Pit Management System
A mostly dead project due to time constraints, consisting of two electron projects to help with operations in the pit such as damage assessments and battey management.

## Scouting
This is where most activity goes on in the repo. This is where the Electron project Overseer and React Native project Sentinel live. These projects provide an interactive and data-rich scouting system for FRC.

You will find this structure inside:

```
scouting
| - common => Common code for Overseer and sentinel
| - dashboard => A simple React dashboard that a view of the latest data processed in AWS
| - overseer => Used to distribute match information and collect data from tablets running sentinel
| - sentinel => Used by scouters to collect scouting data for matches
```

### dashboard
This dashboard project looks off a config object to display certain aggregates for the latest data that has been processed in the AWS pipeline. As of 2025-08-19 it is using the config found in `dashboard/src/2025/outputStructure.ts`. It should be possible to create other output structures for other seasons, and update `dashboard/src/App.tsx` to point to it instead. This dashboard was a quick and easy project to let our scouters view the results of the data they were collecting. There is a lot of room for improvement here.

### Overseer
This is an Electron project. It's basic job is to distribute match assignments to individual scouting tablets using sentinel, scan the match results from sentinel, and export the data for all the matches for a specific competition.

Here is a breakdown of the folders inside and their purpose:
```
overseer
| - src
  | - assets => Images used in frontend
  | - main => Backend process to perform device-level tasks like creating and downloading files
  | - preload => Provides an API for the main process and renderer process to communicate
  | - renderer => A React project providing the front-end components
  | - types => Various typescript types
```

### Sentinel
Sentinel is a React Native project. This is where the meat of the scouting system takes place, and where the most change is required year-to-year. It provides an engaging game-like application for scouters to play by mimicing robot actions. This app is able to provide highly detailed data not typically seen in other scouting applications.

### common
Provides code shared between Sentinel and Overseer. It primarily consists of year-specific TypeScript types to assist with updating the system from year-to-year.

## devops
Various functions to perform devops tasks such as deploying an AWS Lambda function to AWS.

## functions
Location for Python AWS Lambda functions. Each function gets it's own folder withing `function`. The `mms` command `deploy-function` will look at this folder when ran to deploy a specified function.

## iac
This is where the Terraform modules for the resources located in AWS. 

Here is a folder breakdown:
```
iac
| - backend-config => HCL configuration files for each deployable environment
| - scouting => Module related to the scouting system
| - state => Module to keep track of the S3 bucket our Terraform state files are stored in
```

## rnd
A couple Jupyter notebooks used mostly used to test how we can pull files from S3 into Power BI. The intention of this folder is to put one-off files that are used for research that we don't want to lose.