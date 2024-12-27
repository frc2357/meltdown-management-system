### How to setup and run this project:
1. Install NVM (Node Version Manager) at (hopefully) this github page https://github.com/coreybutler/nvm-windows (you don't need yarn)
2. Install Node version 18.16.0 by running 'nvm install 18.16.0' in the terminal, then run 'nvm use 18.16.0'
3. cd into both sentinel and overseer, run npm install on both of them


- To run Overseer, cd into Overseer and run 'npm run start'

- To run Sentinel, cd into Sentinel and run 'npm run start'

- run 'npm run format' after changing code for the code prettifier 

4. make an EXPO account  https://expo.dev/login, then sign in to the account (if given a request failed error, use a wifi hotspot instead of the Shop's wifi)

5. sign into the EXPO website on the tablet with the school account, ask Nolan for password and install the FRCScouting apk file

6. run 'rpm run start' after cd'ing into Overseer. Then type the DECODED url into the tablet, (%3A is a ':'', %2F is a '/')

### Get access to mms devops commands
cd into `devops` and run npm install --global. This will allow you to run the `mms` commands like `update-scouting-version`.