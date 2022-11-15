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

# review
"""
review = db.Review
reviewData = {
    "hotel_id": "636d32111a537da8fd0a1bb2",
    "language": "zh",
    "title": "整體感覺就是五星級該有的軟硬體設備",
    "good_text": "",
    "bad_text": "",
    "normal_text": "性價比高，值得推薦",
    "time": datetime.now(),
    "star": 9.6,
    "importance": 0,
    "people": "兩人同行",
    "room_type": "雙人房"
}
id = review.insert_one(reviewData).inserted_id
print(id)
"""