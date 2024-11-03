from flask import Flask, Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_jwt_extended import JWTManager

# Initialize the blueprint
personalisedcourses_bp = Blueprint('personalisedcourses', __name__)
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
SF_courses = client.SkillsFutureDB.SkillsFutureCourses
jobseekers = client.AppDB.jobseekers

# Initialise Blueprint
allcourses_bp = Blueprint('allcourses', __name__)


@allcourses_bp.route('/api/courses', methods=['GET'])
@jwt_required()
def get_courses():
    # Fetch courses from the database
    courses = SF_courses.find()
    courses_list = []

    # Convert each document to a dictionary and format _id
    for course in courses:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string
        courses_list.append(course)

    return jsonify(courses_list), 200  # Return JSON response

