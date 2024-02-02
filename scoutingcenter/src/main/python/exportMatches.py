import os
import json
import sys
import csv

def loadMatchFiles(inputPath):
    matches = []
    matchFiles = os.listdir(inputPath)
    for file in matchFiles:
        with open(inputPath+"\\"+file) as stream:
            obj = json.load(stream) 
            matches.append(obj)
    return matches

def matchSortVal(match):
    sortVal = int(match['matchNum']) * 10
    sortVal += (0 if match['alliance'].upper() == 'RED' else 3)
    sortVal += int(match['alliancePos'])
    return sortVal

def writeMatches(matches, outputFile):
    repetitiveHeaders = ['matchNum', 'alliance', 'alliancePos', 'teamNum']
    eventHeaders = ['type', 'timestamp','location','leave','notes','harmony','spotlit','trap','miss']
    headers = repetitiveHeaders + eventHeaders

    with open (outputFile, 'w', newline='') as stream:
        csvWriter = csv.writer(stream)

        csvWriter.writerow(headers)

        for match in matches:
            for event in match['events']:
                row = []
                for i in repetitiveHeaders:
                    row.append(match.get(i, ""))
                for i in eventHeaders:
                    row.append(event.get(i, ""))
                csvWriter.writerow(row)

if len(sys.argv) >= 2:
    outputFile = sys.argv[1]
else:
    outputFile = os.path.expanduser("~\\Documents\\matchTest.csv")

if len(sys.argv) >= 3:
    inputPath = sys.argv[2]
else:
    inputPath = os.path.expanduser("~\\Documents\\matchLog\\eventHere")

matches = loadMatchFiles(inputPath)
matches.sort(key=matchSortVal)
writeMatches(matches, outputFile)