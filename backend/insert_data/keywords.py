import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from database import connect
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd


db = connect()
keyword = db.Keyword
hotel = db.Hotel

def get_cnt_and_id(path='../data/keywords_zh_with_count.xlsx'):
    df = pd.read_excel(path)
    df = df[['name', 'all']]
    
    info = dict()
    for idx, row in df.iterrows():
        name = row['name']
        terms = []
        cnts = []
        ids = []

        for pair in row['all'].split():
            term = pair.split(':')[0]
            cnt = int(pair.split(':')[1])

            terms.append(term)
            cnts.append(cnt)
            
            # insert
            query = keyword.find_one({'text': term}, {'text': 0})
            if query:
                ids.append(query['_id'])
            else:
                _id = keyword.insert_one({'text': term}).inserted_id
                ids.append(_id)

        info[name] = pd.DataFrame(data={'keyword': terms, 'count': cnts, '_id': ids})
    
    return info

def update_hotel(info):
    for name, df in info.items():
        toUpdate = {}
        for idx, row in df.iterrows():
            _id = str(row['_id'])
            cnt = row['count']
            toUpdate[_id] = cnt
        
        # update
        filter = { 'name': name }
        newvalues = { "$set": { 'keyword': toUpdate } }
        hotel.update_one(filter, newvalues)


info = get_cnt_and_id()
update_hotel(info)

# test
"""
print(list(hotel.find({})))
print(len(list(hotel.find({}))))
print(hotel.find({'_id': ObjectId('636c9107c2b0dc351e28abcc')}))
"""


# keyword
"""
keyword = db.Keyword
keywordData = {
    "text": "酒店"
}
keyword.insert_one(keywordData)
"""