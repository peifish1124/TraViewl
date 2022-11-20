
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
        "Subpage_Image": x['subpage_image'],
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


        id_cnt = hotel_data['keyword']
        keyword_ids = list(id_cnt.keys())
        
        keyword = db.Keyword
        keyword_data = dict()
        for kid in keyword_ids:
            text = keyword.find_one({"_id": ObjectId(kid)}, {'_id': 0})['text']
            keyword_data[text] = id_cnt[kid]
        
        hotel_data['keyword'] = keyword_data
        
        return hotel_data


def get_time(review):
    return review.get('time')

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
    
    result.sort(key=get_time)

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
    for aspect in aspect_review:
        review_data = review.find({"_id": {"$in": [ ObjectId(x) for x in aspect_review[aspect]]}})
        
        result[aspect] = [{
            'bad_text': x['bad_text'],
            'good_text': x['good_text'],
            'importance': x['importance'],
            'language': x['language'],
            'normal_text': x['normal_text'],
            'star': x['star'],
            'time': x['time'],
            'title': x['title'],
        } for x in review_data]

   

    return result

# connect()

