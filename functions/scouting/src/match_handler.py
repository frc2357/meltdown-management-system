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

def load_match_data(object_name: str) -> dict:
  dynamodb = boto3.client('dynamodb')

  reader = csv.DictReader(s3_iter(object_name), delimiter=',', quotechar='"')
  for line in reader:
    print(line)