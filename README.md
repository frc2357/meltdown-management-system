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
                }
            }

### Event Definitions
All events must have a `type` field
#### Pickup

            {
                type: "pickup",
                piece: "cone or cube",
                location: "left double, right double, single, floor"
            }

#### Drop
            {
                type: "drop",
                piece: "cone or cube"
            }

#### Score
            {
                type: "score",
                piece: "cone or cube",
                row: "0, 1, 2",
                col: "0, 1, ..., 8",
                points: 0
            }

#### Auto
            {
                type: "auto",
                hasMobility: "true or false",
                loc: "engaged, docked, none",
                points: 0
            }

#### Endgame
            {
                type: "endgame",
                loc: "engaged, docked, parked, none",
                points: 0
            }