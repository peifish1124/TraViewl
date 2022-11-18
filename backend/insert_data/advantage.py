import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from database import connect
from bson.objectid import ObjectId
from datetime import datetime


db = connect()
hotel = db.Hotel

# test

print(list(hotel.find({})))
print(len(list(hotel.find({}))))
print(hotel.find({'_id': ObjectId('636c9107c2b0dc351e28abcc')}))



# advantage
"""
advantage = db.Advantage
advantageData = {
    "text": "小朋友"
}
advantage.insert_one(advantageData)
"""