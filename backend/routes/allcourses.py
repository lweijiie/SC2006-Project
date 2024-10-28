from flask import Blueprint, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path='/Users/weiyew/Documents/SC2006/.env')

# MongoDB credentials
mongo_username = os.getenv('MONGO_USERNAME')
mongo_password = os.getenv('MONGO_PASSWORD')
database_name = 'SkillsFutureDB'

# MongoDB connection URI
mongo_uri = f'mongodb+srv://{mongo_username}:{mongo_password}@careerpathnow.tpgyu.mongodb.net/{database_name}?retryWrites=true&w=majority&appName=CareerPathNow'

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db['SkillsFutureCourses']

# Initialise Blueprint
allcourses_bp = Blueprint('allcourses', __name__)

@allcourses_bp.route('/api/courses', methods=['GET'])
def get_courses():
    # Fetch courses from the database
    courses = collection.find()  # Access the correct MongoDB collection
    courses_list = list(courses)  # Convert cursor to list

    # Optionally format the courses to exclude certain fields
    for course in courses_list:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string

    return jsonify(courses_list), 200  # Return JSON response
