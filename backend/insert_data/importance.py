import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd
from database import connect

db = connect()
df = pd.read_csv('data/importance.csv')

review = db.Review

for idx, row in df.iterrows():
  review.update_one({"_id" : ObjectId(row['id'])}, {"$set": {"importance": row['importance']}})
  print(review.find_one({'_id': ObjectId(row['id'])})['importance'])