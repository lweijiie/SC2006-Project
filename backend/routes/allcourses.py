from flask import Flask, Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_jwt_extended import JWTManager

# MongoDB connection URI
mongo_uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"

# Connect to MongoDB
database_name = 'SkillsFutureDB'
client = MongoClient(mongo_uri)
db = client[database_name]
collection = db['SkillsFutureCourses']

# Initialise Blueprint
allcourses_bp = Blueprint('allcourses', __name__)

# Flask app initialization
app = Flask(__name__)
app.config['MONGO_URI'] = mongo_uri  # Set MongoDB URI in Flask config
mongo = PyMongo(app)


@allcourses_bp.route('/api/courses', methods=['GET'])
@jwt_required()
def get_courses():
    # Fetch courses from the database
    courses = SF_courses.find()
    courses_list = []

    # Optionally format the courses to exclude certain fields
    for course in courses_list:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string

    return jsonify(courses_list), 200  # Return JSON response

<<<<<<< HEAD
@app.route('/endorse_course/<course_id>', methods=['POST'])
@jwt_required()
def endorse_course(course_id):
    current_user_email = get_jwt_identity()  # Get the user's email from the JWT
    result = mongo.db.SkillsFutureCourses.update_one(
        {'_id': ObjectId(course_id)},  # Locate the course by its ID
        {'$addToSet': {'endorsed_by': current_user_email}}  # Add the user's email to the "endorsed_by" array
    )

    # Check if the update was successful
    if result.modified_count == 1:
        return jsonify({"message": "Endorsement added successfully."}), 200
    else:
        return jsonify({"error": "Failed to add endorsement. Course not found."}), 404




if __name__ == '__main__':
    app.register_blueprint(allcourses_bp)
    app.run(debug=True)
=======
>>>>>>> 94ae07e69e9f5299254b5fb8cba5945257bdb81d
