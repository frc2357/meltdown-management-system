# scouting-software
Repository for scouting software

## Setup
- Download and install Python
  - Ensure env path variable set to access python
- Download scouting center windows executable (Found under releases on GitHub)
- Setup scouting tablets:
  - Name tablets in form `teamnum-alliance-position`: `2357-BLUE-2`
  - Pair the tablet with **only** the laptop used to run the scouting center
  - Download and install the apk file (Found under releases on GitHub) 
- Create a match csv file to import
  - headers: `match, red1, red2, red3, blue1, blue2, blue3`

## Usage
- Run the scouting center application
- Import the match file with the `Import Match` button
- Open FRCScouter on the tablet
  - Should see the `connected` checkbox for tablet tick when the device connects to the scouting center
- Enter the names of the scouters
- Click the `send assignment` button to send the name of the scouter to the tablet
- Click the `send next match` button to send match information to the tablet
- When the match information is sent to the tablet, the tablet will go to the prematch screen.
  - Scouters will fill this screen out
  - Scouters click the `start` button at the start of the match to move on.
- At the end of the match, scouters will click `Submit` on the endgame screen which will push the match data to the scouting center
- Clicking `export match` will export the match data into a csv

### Notes on connection
- The scouting center can handle disconnects and reconnects
  - Connection is indicated by he `connected` checkbox for each tablet
- The tablets cannot detect disconnects.
- If a disconnect occurs
  - Reload the tablet app
  - Wait for the tablet to connect
  - Click `send assignment` to send the scouter's name
  - You are know good to go.

### Structure of values that Scouting Center will send to Tablets:

### Initial assignment
            {
                type: "assignment",
                info: {
                    id: "", // red1, ..., blue3
                    scouter: "",
                }
            }

### Match
            {
                type: "match",
                info: {
                    matchNum: 0,
                    teamNum: 0000,
                    alliancePos: pos0,
                }
            }