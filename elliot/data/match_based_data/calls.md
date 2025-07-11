1. Get all teams in TBA
2. For each team and for each year from 2002 - 2025
3. Run the call /team/{team_key}/matches/{year}

This should be more efficient:
1. for each year from 2002-2025
2. Get each event
3. For each event in each year
4. Run call /event/{event_key}/matches