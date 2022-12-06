import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from bson.objectid import ObjectId
from datetime import datetime
import pandas as pd
from database import connect

db = connect()
df = pd.read_csv('data/word_cloud.csv')

hotel = db.Hotel

# 改 hotel_name(關鍵字) & hotel_id 即可
hotel_name = '趣旅館'
hotel_id = '637397cd39de7355c1044df8'

a = df[df['name'].str.find(hotel_name) != -1]
print(a)

word_cloud = {}

for idx, row in a.iterrows():
  name = row['name'].split('_')[0]
  aspect = row['name'].split('_')[1]

  good = row['good'].replace('[', '').replace(']', '').replace('\'', '').split(',')
  good = list(map(lambda x: x.strip(), good))

  normal = row['normal'].replace('[', '').replace(']', '').replace('\'', '').split(',')
  normal = list(map(lambda x: x.strip(), normal))

  bad = row['bad'].replace('[', '').replace(']', '').replace('\'', '').split(',')
  bad = list(map(lambda x: x.strip(), bad))

  good_tfidf = row['good_tfidf'].replace('[', '').replace(']', '').replace('\n', '').split(' ')
  good_tfidf = [x for x in good_tfidf if len(x) != 0]
  good_tfidf = list(map(lambda x: float(x), good_tfidf))

  normal_tfidf = row['normal_tfidf'].replace('[', '').replace(']', '').replace('\n', '').split(' ')
  normal_tfidf = [x for x in normal_tfidf if len(x) != 0]
  normal_tfidf = list(map(lambda x: float(x), normal_tfidf))

  bad_tfidf = row['bad_tfidf'].replace('[', '').replace(']', '').replace('\n', '').split(' ')
  bad_tfidf = [x for x in bad_tfidf if len(x) != 0]
  bad_tfidf = list(map(lambda x: float(x), bad_tfidf))

  good_list = []
  normal_list = []
  bad_list = []
  for i in range(20):
    good_dict = {}
    normal_dict = {}
    bad_dict = {}

    good_dict['text'] = good[i]
    good_dict['value'] = good_tfidf[i]
    normal_dict['text'] = normal[i]
    normal_dict['value'] = normal_tfidf[i]
    bad_dict['text'] = bad[i]
    bad_dict['value'] = bad_tfidf[i]

    good_list.append(good_dict)
    normal_list.append(normal_dict)
    bad_list.append(bad_dict)

  word_cloud[aspect + "＿正"] = good_list
  word_cloud[aspect + "＿中"] = normal_list
  word_cloud[aspect + "＿負"] = bad_list

  hotel.update_one({"_id" : ObjectId(hotel_id)}, {"$set": {"word_cloud": word_cloud}})

# print(hotel.find_one({'_id': ObjectId(hotel_id)})['word_cloud'])

