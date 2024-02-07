# scouting-software
Repository for scouting software

## Setup
- Download scouting center windows executable (Found under releases on GitHub)
- Setup scouting tablets:
  - Download and install the apk file (Found under releases on GitHub) 
- Create a match csv file to import into Scouting Center
  - headers: `match, red1, red2, red3, blue1, blue2, blue3`

## Usage
- Run the scouting center application
- Download Template CSV with `Download Template` button
- Import the match file with the `Import CSV` button. Be sure to name the csv file the name of the event. Ex: heartland.csv
  - This will generate 6 QR codes to scan with the tablets. Navigate with the `prev` and `next` buttons at the bottom of the screen
  - You must import a CSV file with the event name to be able to export match data
- Open IScoutPro on the tablet
- Press Scouting
- Scan the tablet's respective QR Code on Scouting Center
- After scanning, the tablet will go to the prematch screen.
  - Scouters will fill this screen out
  - Scouters click the `start` button at the start of the match to move on.
- At the end of the match, scouters will click `Submit` on the endgame screen which display a QR code
- Scan the QR code: Click on the `capturer` button on the Scouting Center then scan the tablet's QR code
  - Scanning will save the data for the match at C:\Users\{yourUser}\Documents\matchLog\{eventName}/{alliance}-{position}-match-{match number}.json   
- Clicking `export match` will export the match data into a csv for the currently loaded event
- Repeat

#### Retrieving match data from tablets 
- If you need to retrieve previous matches on the tablet
- Open the IScoutPro app
- Press Match Logs
- Press the event dropdown to see the matches for that event
- Press the export icon to display a QR code to scan into with ScoutingCenter
- Press the red trash can to delete a match from the tablet
