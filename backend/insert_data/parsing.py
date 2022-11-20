from bson.objectid import ObjectId
from datetime import datetime
import pymongo
import pandas as pd

# test
"""
print(list(hotel.find({})))
print(len(list(hotel.find({}))))
print(hotel.find({'_id': ObjectId('636c9107c2b0dc351e28abcc')}))
"""

client = pymongo.MongoClient("mongodb+srv://sylvey:54067sylvia@traviewl.t6m7fmq.mongodb.net/?retryWrites=true&w=majority")
db = client.TraViewl

df = pd.read_csv('data/temp_parsing.csv')

parsing = db.Parsing
parsing.delete_many({})

# parsing
for i in range(len(df["aspect"])):
    parsingData = {
        "hotel_id": "637397cd39de7355c1044df8",
        "review_id": "",
        "aspect": df['aspect'][i],
        "opinion": df['opinion'][i],
        "sentiment": df['sentiment'][i]
    }
    parsing.insert_one(parsingData)