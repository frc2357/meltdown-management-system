### End goals

1. Pair tablets to laptop, designate tablets as blue1, red1 etc.
2. Input match schedule in laptop, track who is scouting what matches, send to tablet they are using
3. Send match data to laptop at end of match, laptop compiles data into json file
4. Scouting laptop has button to export json match files to format (csv, excel), strictly tabular data
5. Easy process to load and create templates for game years, programming free
6. Common components to build templates
7. Send template to tablets
8. Log taps
9. Integration with blue alliance

### Goals for cowtown

1. Create templateable class - layout in one place
2. Handwrite importable file with match information (C# component?) (Include scouter)
3. Pair tablets to laptop, designate tablets as blue1, red1 etc. 
   1. Laptop tell tablet what match #, alliance station, robot team number/name, 
4. Pre-match dialogue - go to pre-match after submitting end game - show match info: tablet id, team, scout name, match number, start position, show image of field with buttons where they go.
5. Show connected device on laptop, indicator it receives a file
6. Button presses on UI are log of events (CSV?)
   - array for each type of event
   - Grid: gamepiece, column, row, timestamp (create another event for supercharge)
   - Pickup: location, gamepiece, timestamp
   - Drop: gamepiece, timestamp
   - Lack of events mean end of match
7. Auto: Button for end of auto to show dialogue, button for mobility, dock, or engaged
8. Match UI - Background of field, buttons on scoring positions of the field
   - For 2023: 
     - Only show grid, tap on spot to mark gamepiece,
       - Press once - add, press and hold - remove
       - On low - show cube and cone - based on last intake (stateful approach)
     - Image of intake area to mark pickup parts - choose what gamepiece they picked up
       - Left substation, right substation, single substation, floor (cone, cube, dropped options)
     - Have image to show state of robot
9. Endgame: park, dock, or engaged, note field, 
10. Edge cases:
    1.  Long press delete events on grid

Component needs:
1. Image at specified height and width, z-index as images and controls may overlap
2. Simple button
3. Toggle button
4. Checkbox
5. Radio button set
6. Text box for notes
7. Labels
8. All must be invisible, be able to show images or text
