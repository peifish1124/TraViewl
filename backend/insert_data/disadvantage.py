import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from database import connect
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd

db = connect()
disadvantage = db.Disadvantage
hotel = db.Hotel

def insert_disadvantage(path='../data/keywords_zh_with_count.xlsx'):
    df = pd.read_excel(path)
    df = df[['name', 'bad']]

    for idx, row in df.iterrows():
        name = row['name']
        ids = []
        
        for term in row['bad'].split():
            # insert
            query = disadvantage.find_one({'text': term}, {'text': 0})
            if query:
                ids.append(str(query['_id']))
            else:
                _id = disadvantage.insert_one({'text': term}).inserted_id
                ids.append(str(_id))

        # update
        filter = { 'name': name }
        newvalues = { "$set": { 'disadvantage': ids } }
        hotel.update_one(filter, newvalues)

insert_disadvantage()

# test
"""
print(list(hotel.find({})))
print(len(list(hotel.find({}))))
print(hotel.find({'_id': ObjectId('636c9107c2b0dc351e28abcc')}))
"""


# disadvantage
"""
disadvantage = db.Disadvantage
disadvantageData = {
    "text": "步行"
}
disadvantage.insert_one(disadvantageData)
"""