import pymongo
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd

# test
"""
print(list(hotel.find({})))
print(len(list(hotel.find({}))))
print(hotel.find({'_id': ObjectId('636c9107c2b0dc351e28abcc')}))
"""

# 每次跑不同飯店 只要換 csv_name & hotel_id

client = pymongo.MongoClient("mongodb+srv://sylvey:54067sylvia@traviewl.t6m7fmq.mongodb.net/?retryWrites=true&w=majority")
db = client.TraViewl

csv_name = 'data/reviews/chinese_OwlStay Flip Flop Hostel Garden.csv'
df = pd.read_csv(csv_name)

review = db.Review
# review.delete_many({})

convert_time = []
for idx, row in df.iterrows():
    time = row['time']
    time = time.replace('年', '/')
    time = time.replace('月', '/')
    time = time.split('日')[0]
    convert_time.append(time)
df['convert_time'] = convert_time

# review
li = []
for i in range(len(df["title"])):
    reviewData = {
        "hotel_id": "637397cd39de7355c1044dea",
        "language": "zh",
        "title": df['title'][i],
        "good_text": "",
        "bad_text": "",
        "normal_text": df['normal_text'][i],
        "time": datetime.strptime(df['convert_time'][i], '%Y/%m/%d'),
        "star": df['star'][i],
        "importance": 0
    }
    id = review.insert_one(reviewData).inserted_id
    li.append(id)

df.insert(0, "_id", li)
df.to_csv(csv_name, index=False)

print(len(list(review.find({}))))