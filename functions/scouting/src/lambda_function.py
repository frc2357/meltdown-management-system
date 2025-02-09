import match_handler

def lambda_handler(event, context):
  try:
    event_name = event["Records"][0]["eventName"]
    match event_name:
      case 'ObjectCreated:Put':
        object_name = event["Records"][0]["s3"]["object"]["key"]
        return match_handler.load_match_data(object_name)
      case _:
        print(f"Unexpected event name: {event_name}")
        return {'status': 'fail'}
  except Exception as e:
    print(f"Unexpected error in Function Scouting: {e}")
    return {'status': 'fail'}