import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from database import connect
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd



wordlist = ['交通', '早餐', '房間', '服務', '設備', '價格']
db = connect()
hotelcl = db.Hotel
rv = pd.read_csv('data/reviews/chinese_趣旅館 - 林森館 (Hotel Fun - Linsen).csv')

aspect_review = {}

for word in wordlist:
    df = pd.read_excel('data/aspect_review/'+ word +'/_chinese_趣旅館 - 林森館 (Hotel Fun - Linsen)_'+ word +'_reviews.xlsx')
    _ids = [rv['_id'][x] for x in df['review_id']] 
    print(len(_ids))
    aspect_review[word] = _ids

hotelcl.update_one({'name': '趣旅館 - 林森館 (Hotel Fun - Linsen)'}, { "$set": { "aspect_review": aspect_review } })
# print(aspect_review)

    

