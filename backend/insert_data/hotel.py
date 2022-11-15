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

# hotel
"""
hotel = db.Hotel
hotelData = {
    "name": "台北時代寓所 (Hotel Resonance Taipei, Tapestry Collection by Hilton)",
    "county": "台北市",
    "district": "中正區",
    "advantage": ['636d2623289def1825d83e98', '636d263a7dc6a603ac2806f2', '636d264b75c2a9a266e0ce67', '636d26531439e7cb56a56c66', '636d265ca4ee6105f8ffab38', '636d2663f1848ebf4b647c8b'],
    "disadvantage": ['636d2736c8b8b81efbadee5d', '636d273c7f79a0161872f021', '636d2743f646e25aa854e1af'],
    "keyword": {'636d27c71c0d381c689f6128': 20, '636d27d1d4650139e30970d2': 42},
    "sentiment_ratio": {"房間": [72, 13, 15], "早餐": [58, 20, 22], "設備": [60, 30, 10], "交通": [62, 33, 5], "服務": [20, 70, 10], "價格": [40, 30, 30]},
    "aspect_review": {"房間": ['636d2f0ae47cf18543bc32e9', '636d2f6ef1ef4af478870bac', '636d2fa522ba91efa40b371d', '636d30649acff279abff323c', '636d30ce5b94492296af2fc9'], "早餐": ['636d301502d1272df482d1fd'], "設備": ['636d308b3c655b601e54e203'], "交通": ['636d2fcfce4a49122e8e65a3', '636d303363ec48878b64be48'], "服務": ['636d2f43d96761241ee33452', '636d30ab2d7dcfd67fbf5235'], "價格": ['636d310b5163c111cecf3fdc']},
    "home_image": "https://lh5.googleusercontent.com/p/AF1QipN51pEBNObMiPhk_-ABi71nlho7Z1o2IMfCQBLn=w253-h337-k-no",
    "subpage_image": "https://lh4.googleusercontent.com/proxy/Uhcn1MAoJoqckRFx7ViHoyhesSlPBjUZJLtXkp9nXcLXP6JWGIhzM2LQ7pR0qLaAU3n48iEyPIu-YHI4hYsiAfBT2nAxnQSaKeAfIZRIlrkYKzW-jFcdEhdowvw8j80LTgOQ0X-HhiVkjJ10tNhYY7VyNs67fw=w253-h168-k-no",
}
hotel.insert_one(hotelData)
"""
