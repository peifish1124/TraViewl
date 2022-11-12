
import time
import os
import pymongo
from bson.objectid import ObjectId
from datetime import datetime


def connect():
    client = pymongo.MongoClient("mongodb+srv://sylvey:54067sylvia@traviewl.t6m7fmq.mongodb.net/?retryWrites=true&w=majority")
    db = client.TraViewl
    return db

def getHotels():
    db = connect()
    hotel = db.Hotel
    disadvantage = db.Disadvantage
    advantage = db.Advantage
    
    data = list(hotel.find({}))
    
    returnData = [{
        "_id": str(x["_id"]),
        "Name": x["name"],
        "County": x["county"],
        "District": x["district"],
        "Home_Image": x["home_image"],
        "Advantage": [ advantage.find_one({"_id": ObjectId(y)})["text"] for y in x["advantage"] ],
        "Disadvantage": [ disadvantage.find_one({"_id": ObjectId(y)})["text"] for y in x["disadvantage"] ]
    } for x in data]

    # print(returnData)


    return returnData

def getHotelContent(hotel_id):
    db = connect()
    parsing = db.Parsing

    dataP = list(parsing.find({"hotel_id": hotel_id}))
    print(dataP)
    returnData = {
        x["aspect"] : {y["opinion"]: y["sentiment"] for y in dataP if y["aspect"] == x["aspect"]} 
        for x in dataP
    }

    # print(returnData)

    return returnData

def getHotelById(hotel_id):
    db = connect()
    hotel = db.Hotel
    # without hotel_id: all hotels
    if hotel_id == None:
        data = list(hotel.find({}))
        return(data)
    
    # with hotel_id: a hotel
    else:
        hotel_id = ObjectId(hotel_id)
        hotel_data = hotel.find_one(
            {"_id": hotel_id},
            {
                '_id': 0,
                'name': 1,
                'subpage_image': 1,
                'sentiment_ratio': 1,
                'keyword': 1
            }
        )

        sentiment_data = []
        for k, v in hotel_data['sentiment_ratio'].items():
            sentiment_data.append({
                'aspect': k,
                'positive': v[0],
                'neutral': v[2],
                'negative': v[1]
            })
        hotel_data['sentiment_ratio'] = sentiment_data

        keyword_ids = hotel_data['keyword']
        keyword = db.Keyword
        keyword_data = [ keyword.find_one({"_id": ObjectId(kid)}, {'_id': 0})['text'] for kid in keyword_ids ]
        hotel_data['keyword'] = keyword_data
        
        return hotel_data

def getHotelAmount(hotel_id):
    db = connect()
    review = db.Review
    
    review_data = list(review.find(
        {"hotel_id": hotel_id},
        {
            'time': 1,
            'star': 1
        }
    ))

    result = []
    for data in review_data:
        r = dict()
        r['review_id'] = str(data['_id'])
        r['time'] = data['time']
        r['star'] = data['star']
        result.append(r)

    return result

def getHotelAspect(hotel_id):
    db = connect()
    hotel = db.Hotel
    review = db.Review

    hotel_id = ObjectId(hotel_id)
    aspect_review = hotel.find_one(
        {"_id": hotel_id},
        {
            '_id': 0,
            'aspect_review': 1,
        }
    )['aspect_review']

    result = dict()
    for aspect, review_ids in aspect_review.items():
        review_data = []
        for review_id in review_ids:
            review_data.append(review.find_one(
                {"_id": ObjectId(review_id)},
                {
                    '_id': 0,
                    'hotel_id': 0    
                }
            ))
        
        result[aspect] = review_data

    return result

# connect()

# hotel = traveiwl.Hotel
#hotel = db.Hotel
# hotelData = {
#     "Name": "常春藤酒店",
#     "County": "不存在的城市",
#     "District": "不存在的區",
#     "Advantage": '0123456789ab0123456789ab',
#     "Disadvantage": '0123456789ab0123456789ab',
#     "Keyword": {'0123456789ab0123456789ab': '0123456789ab0123456789ab'},
#     "Sentiment": {"面向": [12, 13, 23]},
#     "Img_path": "path",
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


