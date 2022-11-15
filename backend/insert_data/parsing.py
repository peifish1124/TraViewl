from database import connect
from bson.objectid import ObjectId
from datetime import datetime

# test
"""
print(list(hotel.find({})))
print(len(list(hotel.find({}))))
print(hotel.find({'_id': ObjectId('636c9107c2b0dc351e28abcc')}))
"""

db = connect()


# parsing
"""
parsing = db.Parsing
parsingData = {
    "hotel_id": "636d32111a537da8fd0a1bb2",
    "review_id": "636d2f6ef1ef4af478870bac",
    "aspect": "交通",
    "opinion": "遠",
    "sentiment": "negative"
}
parsing.insert_one(parsingData)
"""