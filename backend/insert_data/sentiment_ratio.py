import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from database import connect
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd
import numpy as np

db = connect()
hotelcl = db.Hotel
reviewcl = db.Review

reviewsAll = reviewcl.find({})
starsAll = [x['star'] for x in reviewsAll]



lower_q = np.quantile(starsAll, 0.25, method='lower')
higher_q = np.quantile(starsAll, 0.75, method='higher')
# print(lower_q, higher_q)

hotelsAll = hotelcl.find({})
for hotel in hotelsAll:
    aspect_review = hotel['aspect_review']
    # print(aspect_review)
    sentiment_ratio = {}
    for aspect in aspect_review:
        review_data = reviewcl.find({"_id": {"$in": [ ObjectId(x) for x in aspect_review[aspect]]}})
        review_data_stars = [x['star'] for x in review_data]
        positive = len([x for x in review_data_stars if x >= higher_q])/len(review_data_stars)
        negative = len([x for x in review_data_stars if x < lower_q])/len(review_data_stars)
        neutral = len([x for x in review_data_stars if x < higher_q and x >= lower_q ])/len(review_data_stars)
        # print(aspect, positive, negative, common)
        sentiment_ratio[aspect] = {'positive': positive, 'negative': negative, 'neutral': neutral}
    print(sentiment_ratio)
    hotelcl.update_one({'name': hotel['name']}, { "$set": { "sentiment_ratio": sentiment_ratio } })
    # print(aspect_review)
    # break


