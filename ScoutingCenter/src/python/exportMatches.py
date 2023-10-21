import os
import json
import sys
import csv

def loadMatchFiles():
    matches = []
    path = os.path.expanduser("~\\Documents\\matchLog")
    matchFiles = os.listdir(path)
    for file in matchFiles:
        with open(path+"\\"+file) as stream:
            obj = json.load(stream) 
            matches.append(obj)
    return matches

def matchSortVal(match):
    sortVal = int(match['matchNum'])
    sortVal += 0 if match['alliance'].upper() == 'RED' else 3
    sortVal += int(match['alliancePos'])
    return sortVal

def writeMatches(matches, outputFile):
    repetitiveHeaders = ['matchNum', 'alliance', 'alliancePos', 'teamNum']
    eventHeaders = ['type', 'piece', 'isAuto', 'location', 'row', 'col', 'hasMobility', 'notes', 'timestamp']
    headers = repetitiveHeaders + eventHeaders

    with open (outputFile, 'w', newline='') as stream:
        csvWriter = csv.writer(stream)

        csvWriter.writerow(headers)

        for match in matches:
            for event in match['events']:
                row = [match['matchNum'], match['alliance'], match['alliancePos'], match['teamNum']]
                for i in eventHeaders:
                    print("Header: ", i)
                    row.append(event.get(i, ""))
                    print("Row: ", row)
                csvWriter.writerow(row)

if len(sys.argv) >= 2:
    outputFile = sys.argv[1]
else:
    outputFile = os.path.expanduser("~\\Documents\\matchTest.csv")

matches = loadMatchFiles()
matches.sort(key=matchSortVal)
writeMatches(matches, outputFile)