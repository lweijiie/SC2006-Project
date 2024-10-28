from flask import Flask, Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path='/Users/weiyew/Documents/SC2006/.env')

# MongoDB credentials
mongo_username = os.getenv('MONGO_USERNAME')
mongo_password = os.getenv('MONGO_PASSWORD')
database_name = 'SkillsFutureDB'

# MongoDB connection URI
mongo_uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db['SkillsFutureCourses']

# Initialise Blueprint
allcourses_bp = Blueprint('allcourses', __name__)

@allcourses_bp.route('/api/courses', methods=['GET'])
@jwt_required()
def get_courses():
    # Fetch courses from the database
    courses = mongo.db.SkillsFutureCourses.find()  # Your collection name
    courses_list = list(courses)  # Convert cursor to list

    # Optionally format the courses to exclude certain fields
    for course in courses_list:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string

    return jsonify(courses_list), 200  # Return JSON response

if __name__ == '__main__':
    app.run(debug=True)
