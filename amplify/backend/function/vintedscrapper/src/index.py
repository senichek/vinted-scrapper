# The python dependencies have been uploaded to the lambda's layer as  .zip package.
# The .zip package has the following structure:
# python.zip -> python folder (python folder contains the folders with the individual packages).
# See https://youtu.be/lrEAu75zhNI for more details.

import json
import os
from pymongo.mongo_client import MongoClient
from datetime import datetime
import requests

def write_to_db(data):
    print("<<write_to_db>> has been invoked")
#   DB connection
    uri = os.environ.get('DB_CONNECTION_STRING')

# Create a new client and connect to the server
    client = MongoClient(uri)
    try:
        db = client["mega-scrapper-db"]
        collection = db["brands"]

        # Clear collection before writing new data
        collection.delete_many({})
        # Persist data into the collection
        result = collection.insert_many(data)
        if result.inserted_ids:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': os.environ.get('CORS_URL'),
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps("The batch has been persisted to DB")
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Origin': os.environ.get('CORS_URL'),
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps("Failed to persist data to DB")
            }
    except Exception as e:
        print(e)
    finally:
        print("<<Finally>> block has been invoked to close db connection")
        client.close()

def get_page_content(url, head):
    req = requests.get(url, headers=head)
    return req.content

url = 'https://www.vinted.fr/catalog?brand_ids[]=53&brand_ids[]=7&brand_ids[]=12&brand_ids[]=11425&brand_ids[]=172724&brand_ids[]=14&brand_ids[]=100&brand_ids[]=17&brand_ids[]=307763&brand_ids[]=3031&brand_ids[]=105&brand_ids[]=179064&brand_ids[]=15&brand_ids[]=55&brand_ids[]=304653&brand_ids[]=343&brand_ids[]=13227' 

header = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
  'Accept-Encoding': 'none',
  'Accept-Language': 'en-US,en;q=0.8',
  'Connection': 'keep-alive'
}

def transform_content(cont):
    result = []
    # Cut out the piece of string we'd like to use
    start_pointer = cont.find("\"brands\":[")
    end_pointer = cont.find("],\"sizeGroups\"")
    substring = cont[start_pointer+len("\"brands\":["):end_pointer]
    # Create array of strings
    arr = substring.split("},")
    # Add the separator because the split method removes the separator while splitting
    for x in arr:
        if x[-1] != "}":
            after_append = x + "}"
        # Transform into json
            json_obj = json.loads(after_append)
            result.append(json_obj)
    # Save to db
    return result

def handler(event, context):
    content = get_page_content(url, header)
    content_as_string = content.decode('utf-8')
    res = transform_content(content_as_string)
    result = write_to_db(res)
    return result