from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

# Initialise Blueprint
allcourses_bp = Blueprint('allcourses', __name__)

# Flask app initialization
app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/SkillsFutureDB?retryWrites=true&w=majority&appName=CareerPathNow"  # Set MongoDB URI in Flask config
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'  # Change this to a random secret key
jwt = JWTManager(app)


@allcourses_bp.route('/api/courses', methods=['GET'])
@jwt_required()
def get_courses():
    # Fetch courses from the database
    courses = mongo.db.SkillsFutureCourses.find()  # Your collection name
    courses_list = list(courses)  # Convert cursor to list

    # Format the courses to set a default for endorsement if it doesn’t exist
    for course in courses_list:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string
        if 'endorsement' not in course:
            course['endorsement'] = 0  # Initialize endorsement if it is missing

    return jsonify(courses_list), 200  # Return JSON response

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
