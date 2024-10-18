import os
import json
from pymongo import MongoClient
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv(dotenv_path='/Users/weiyew/Documents/SC2006/.env')

# MongoDB credentials
mongo_username = os.getenv('MONGO_USERNAME')
mongo_password = os.getenv('MONGO_PASSWORD')
access_token = os.getenv('ACCESS_TOKEN')
database_name = 'SkillsFutureDB'


# MongoDB connection URI
mongo_uri = f'mongodb+srv://{mongo_username}:{mongo_password}@careerpathnow.tpgyu.mongodb.net/{database_name}?retryWrites=true&w=majority&appName=CareerPathNow'

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db['SkillsFutureCourses']

# Load JSON data from Courses.json
with open('Courses.json') as file:
    json_data = json.load(file)

# Extract the courses
courses_data = json_data['data']['courses']

# Insert the data into MongoDB
if courses_data:
    collection.insert_many(courses_data)
    print(f'{len(courses_data)} courses inserted into MongoDB!')
else:
    print('No course data to insert.')
