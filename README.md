# scouting-software
Repository for scouting software

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

### Event Definitions
All events must have a `type` field

#### Matchinf 
            {
                matchNum
                teamNum
                scouterName
                preload:
                notes
            }
#### Pickup

            {
                type: "pickup",
                piece: "cone or cube",
                location: "left double, right double, single, floor",
                iaAuto
            }

#### Drop
            {
                type: "drop",
                piece: "cone or cube"
                iAuto,
            }

#### Score
            {
                type: "score",
                piece: "cone or cube",
                row: "0, 1, 2",
                col: "0, 1, ..., 8",
                isAuto: ""
            }

#### Auto
            {
                type: "auto",
                hasMobility: "true or false",
                loc: "engaged, docked, none",
            }

#### Endgame
            {
                type: "endgame",
                loc: "engaged, docked, parked, none",
            }

#### Full event