
import time
import os
import pymongo
from bson.objectid import ObjectId
from datetime import datetime

def connect():
    client = pymongo.MongoClient("mongodb+srv://sylvey:54067sylvia@traviewl.t6m7fmq.mongodb.net/?retryWrites=true&w=majority")
    db = client.TraViewl

    return db


# connect()

# hotel = traveiwl.Hotel
# hotelData = {
#     "Name": "常春藤酒店",
#     "County": "不存在的城市",
#     "District": "不存在的區",
#     "Advantage": '0123456789ab0123456789ab',
#     "Disadvantage": '0123456789ab0123456789ab',
#     "Keyword": {'0123456789ab0123456789ab': '0123456789ab0123456789ab'},
#     "Sentiment": {"面向": [12, 13, 23]}
# }
# id = hotel.insert_one(hotelData).inserted_id

# advantage = traveiwl.Advantage
# advantageData = {"text": "乾淨"}
# id = advantage.insert_one(advantageData).inserted_id
# findOne = advantage.find_one({"_id": ObjectId(id)})

# disadvantage = traveiwl.Disadvantage
# dsiadvantageData = {"text": "髒"}
# id = disadvantage.insert_one(dsiadvantageData).inserted_id
# findOne = disadvantage.find_one({"_id": ObjectId(id)})

# keyword = traveiwl.Keyword
# keywordData = {"text": "房間"}
# id = keyword.insert_one(keywordData).inserted_id
# findOne = keyword.find_one({"_id": ObjectId(id)})

# review = traveiwl.Review
# reviewData = {
#     "Language": "zh",
#     "Title": "很讚",
#     "Good_text": "很讚",
#     "Bad_text": "不好",
#     "Normal_text": "普普",
#     "Time": datetime.now(),
#     "Star": 6.0,
#     "Importance": 13.5 
# }
# id = review.insert_one(reviewData).inserted_id
# findOne = review.find_one({"_id": ObjectId(id)})

# reviewsearchid = traveiwl.Review_Search_ID
# reviewsearchidData = {
#     "Aspect": "房間",
#     "Reviews": ["63652e9d54381e1903cff17f"]
# }
# id = reviewsearchid.insert_one(reviewsearchidData).inserted_id
# findOne = reviewsearchid.find_one({"_id": ObjectId(id)})


