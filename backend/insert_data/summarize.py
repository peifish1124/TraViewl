import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd
from database import connect

db = connect()
df = pd.read_csv('data/summarize_1.csv')

hotel = db.Hotel
count = 0
for id in ['637397cd39de7355c1044de5','637397cd39de7355c1044de6','637397cd39de7355c1044de7','637397cd39de7355c1044de8','637397cd39de7355c1044de9','637397cd39de7355c1044dea','637397cd39de7355c1044deb','637397cd39de7355c1044dec','637397cd39de7355c1044ded','637397cd39de7355c1044dee','637397cd39de7355c1044def','637397cd39de7355c1044df0','637397cd39de7355c1044df1','637397cd39de7355c1044df2','637397cd39de7355c1044df3','637397cd39de7355c1044df4','637397cd39de7355c1044df5','637397cd39de7355c1044df6','637397cd39de7355c1044df7','637397cd39de7355c1044df8']:
  summarize = {}
  for aspect in ['交通', '早餐', '房間', '服務', '設備', '價格']:
    for sentiment in ['_正', '_中', '_負']:
      a_s = aspect+sentiment
      summarize[a_s] = df[(df['id'] == id) & (df['aspect'] == a_s)]['summarize'][count]
      count += 1
  hotel.update_one({"_id" : ObjectId(id)}, {"$set": {"summarize": summarize}})
  print('-------\n')
  print(summarize)