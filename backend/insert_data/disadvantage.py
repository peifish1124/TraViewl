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

# disadvantage
"""
disadvantage = db.Disadvantage
disadvantageData = {
    "text": "步行"
}
disadvantage.insert_one(disadvantageData)
"""