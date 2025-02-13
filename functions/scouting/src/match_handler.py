import os
import boto3
import csv

ENV = os.environ.get('ENVIRONMENT', 'dev')
BUCKET_RAW_NAME = f"mms-{ENV}-scouting-raw"
BUCKET_OUTPUT_NAME = f"mms-{ENV}-scouting-output"
TABLE_NAME = f"mms-{ENV}-scouting"

def s3_iter(object_name: str):
  s3 = boto3.client('s3')
  object_response = s3.get_object(Bucket=BUCKET_RAW_NAME, Key=object_name)
  line_iter = object_response["Body"].iter_lines()
  for line in line_iter:
    yield bytes.decode(line)

def isAuto(time: str):
  return float(time) < 15

def load_match_data(object_name: str) -> dict:
  reader = csv.DictReader(s3_iter(object_name), delimiter=',', quotechar='"')

  event_name = object_name.split(".")[0].lower()
  prevKey = ""
  items = []
  item = {}
  for line in reader:
    key = f"{line["teamNum"]}-{line["matchNum"]}"
    if prevKey != key:
      item = {
      "event": event_name,
      "team-match": key,
      "alliancePosition": f"{line['alliance'][0]}{line['alliancePos']}",
      "startLocation": "",
      "autoLeave": 0,
      "end": "",
      "defenseRating": 0,
      "algaeClear": 0,
      "notes": "",
      "coralPickup": 0,
      "autoCoral": 0,
      "coralPickup": 0,
      "coralFloor": 0,
      "coralStation": 0,
      "algaeFloor": 0,
      "coralMiss": 0,
      "algaeMiss": 0,
      "coralL1": 0,
      "coralL2": 0,
      "coralL3": 0,
      "coralL4": 0,
      "aCoralL1": 0,
      "aCoralL2": 0,
      "aCoralL3": 0,
      "aCoralL4": 0,
      "algaeBarge": 0,
      "algaeProcessor": 0
      }
      prevKey = key
      items.append(item)
    match line["type"]:
      case "start":
        item["startLocation"] = line["location"]
      case "auto":
        item["autoLeave"] = 1 if line["leave"] == "TRUE" else 0
      case "endgame":
        item["end"] = line["location"]
        item["defenseRating"] = line["defenseRating"]
        item["algaeClear"] = line["clearAlgae"]
        item["notes"] = line["notes"]
      case "pickup":
        if (isAuto(line["timestamp"]) and line["gamepiece"] == "coral"):
          item["autoCoral"] += 1
        elif line["gamepiece"] == "coral":
          item["coralPickup"] += 1
          if line["location"] == "floor":
            item["coralFloor"] += 1
          else:
            item["coralStation"] += 1
        else:
          item["algaeFloor"] += 1
      case "drop":
        if (line["gamepiece"] == "coral"):
          item["coralMiss"] += 1
        else:
          item["algaeMiss"] += 1
      case "score":
          prefix = "aC" if isAuto(line["timestamp"]) else "c"
          
          if (line["miss"] == "TRUE" and line["location"] in ["reefL1", "reefL2", "reefL3", "reefL4"]):
            item["coralMiss"] += 1
            continue
          elif (line["miss"] == "TRUE" and line["location"] in ["net", "processor"]):
            item["algaeMiss"] += 1
            continue

          match line["location"]:
            case "reefL1":  
              item[f"{prefix}oralL1"] +=  1
            case "reefL2":
              item[f"{prefix}oralL2"] += 1
            case "reefL3":
              item[f"{prefix}oralL3"] += 1
            case "reefL4":
              item[f"{prefix}oralL4"] += 1
            case "net":
                item["algaeBarge"] += 1
            case "processor":
              item["algaeProcessor"] += 1

  output = []
  keys = items[0].keys()
  output.append(",".join(keys))
  for item in items:
    output.append(",".join(str(item[key]) for key in keys))
  csv_data = "\n".join(output)

  s3 = boto3.client('s3')
  s3.put_object(Bucket=BUCKET_OUTPUT_NAME, Key=f"{event_name}.csv", Body=csv_data)