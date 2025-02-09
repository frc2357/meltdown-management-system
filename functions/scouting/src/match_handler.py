import os
import boto3
import csv

ENV = os.environ.get('ENVIRONMENT', 'dev')
BUCKET_NAME = f"mms-{ENV}-scouting-raw"
TABLE_NAME = f"mms-{ENV}-scouting"

def s3_iter(object_name: str):
  s3 = boto3.client('s3')
  object_response = s3.get_object(Bucket=BUCKET_NAME, Key=object_name)
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
      "alliancePosition": f"{line["alliance"][0]}{line["alliancePos"]}",
      }
      prevKey = key
      items.append(item)
    match line["type"]:
      case "start":
        item["startLocation"] = line["location"]
      case "auto":
        item["autoLeave"] = 1 if line["leave"] else 0
      case "endgame":
        item["end"] = line["location"]
        item["defenseRating"] = line["defenseRating"]
        item["algaeClear"] = line["clearAlgae"]
        item["notes"] = line["notes"]
      case "pickup":
        if (isAuto(line["timestamp"]) and line["gamepiece"] == "coral"):
          item["autoCoral"] = item.get("autoCoral", 0) + 1
        elif line["gamepiece"] == "coral":
          item["coralPickup"] = item.get("coralPickup", 0) + 1
          if line["location"] == "floor":
            item["coralFloor"] = item.get("coralFloor", 0) + 1
          else:
            item["coralStation"] = item.get("coralStation", 0) + 1
        else:
          item["algaeFloor"] = item.get("algaeFloor", 0) + 1
      case "drop":
        if (line["gamepiece"] == "coral"):
          item["coralMiss"] = item.get("coralMiss", 0) + 1
        else:
          item["algaeMiss"] = item.get("algaeMiss", 0) + 1
      case "score":
        if(line["gamepiece"] == "coral"):
          prefix = "a" if isAuto(line["timestamp"]) else ""
          if(line["miss"] == "true"):
            item["coralMiss"] = item.get("coralMiss", 0) + 1
            continue
          match line["location"]:
            case "reefL1":
              item[f"{prefix}CoralL1"] = item.get(f"{prefix}CoralL1", 0) + 1
            case "reefL2":
              item[f"{prefix}CoralL2"] = item.get(f"{prefix}CoralL2", 0) + 1
            case "reefL3":
              item[f"{prefix}CoralL3"] = item.get(f"{prefix}CoralL3", 0) + 1
            case "reefL4":
              item[f"{prefix}CoralL4"] = item.get(f"{prefix}CoralL4", 0) + 1
        else:
          if(line["miss"] == "true"):
            item["algaeMiss"] = item.get("algaeMiss", 0) + 1
          elif (line["location"] == "net"):
            item["algaeBarge"] = item.get("algaeBarge", 0) + 1
          else:
            item["processor"] = item.get("processor", 0) + 1

  print(items)

  dynamodb = boto3.resource('dynamodb')
  table = dynamodb.Table(TABLE_NAME)

  with table.batch_writer() as writer:
    for item in items:
      writer.put_item(Item=item)
