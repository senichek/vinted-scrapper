# The python dependencies have been uploaded to the lambda's layer as  .zip package.
# The .zip package has the following structure:
# python.zip -> python folder (python folder contains the folders with the individual packages).
# See https://youtu.be/lrEAu75zhNI for more details.

import json
import os
from pymongo.mongo_client import MongoClient
from datetime import datetime

def write_to_db():
    print("<<write_to_db>> has been invoked")
#   DB connection
    uri = os.environ.get('DB_CONNECTION_STRING')

# Create a new client and connect to the server
    client = MongoClient(uri)
    try:
        db = client["mega-scrapper-db"]
        collection = db["elements"]
        now = datetime.now()
        # dd/mm/YY H:M:S
        dt_string = now.strftime("%d/%m/%Y %H:%M:%S")
        data = { "Event was triggered": dt_string }
        result = collection.insert_one(data)
        if result.inserted_id:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': os.environ.get('CORS_URL'),
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps("Document {} has been inserted successfully".format(data))
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': os.environ.get('CORS_URL'),
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps("Failed to insert document {}".format(data))
            }
    except Exception as e:
        print(e)
    finally:
        print("<<Finally>> block has been invoked to close db connection")
        client.close()

def handler(event, context):
  print("The <<handler>> has been invoked")
  result = write_to_db()
  return result