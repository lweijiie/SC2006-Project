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

# Helper function to recursively convert ObjectId to string
def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: convert_objectid(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    return obj

@allcourses_bp.route('/api/courses', methods=['GET'])
@jwt_required()
def get_courses():
    # Fetch courses from the database
    courses = mongo.db.SkillsFutureCourses.find()  
    courses_list = list(courses)  # Convert cursor to list

    # Format the courses to set a default for endorsement if it doesn’t exist
    for course in courses_list:
        course['_id'] = str(course['_id'])  # Convert ObjectId to string
        if 'endorsement' not in course:
            course['endorsement'] = 0  # Initialize endorsement if it is missing

    # Recursively convert all ObjectId fields to string before returning
    courses_list = convert_objectid(courses_list)

    return jsonify(courses_list), 200  # Return JSON response

@app.route('/endorse_course/<course_id>', methods=['POST'])
@jwt_required()
def endorse_course(course_id):
    current_user_id = get_jwt_identity()  # Get the user's ID from the JWT

    # Debugging: Print current_user_id to verify it is an ObjectId string
    print("Current user id:", current_user_id)
    
    # Ensure `current_user_id` is treated as an ObjectId for the query
    try:
        employer_id = ObjectId(current_user_id)
    except Exception as e:
        return jsonify({"error": "Invalid user ID format."}), 400
    
    # Find the employer's document to get the _id in AppDB.employers
    employer = mongo.cx['AppDB'].employers.find_one({'_id': employer_id})
    
    # Debugging: Print employer if found
    print("Employer document:", employer)
    
    if not employer:
        return jsonify({"error": "Employer not found."}), 404
    
    # Add the employer's _id to "endorsed_by" in SkillsFutureCourses collection in SkillsFutureDB
    result = mongo.cx['SkillsFutureDB'].SkillsFutureCourses.update_one(
        {'_id': ObjectId(course_id)},
        {
            '$addToSet': {'endorsed_by': employer_id},  # Use _id instead of email
            '$inc': {'endorsement': 1}  # Increment the endorsement counter by 1
        }
    )

    # Check if the course endorsement was successfully updated
    if result.modified_count == 1:
        # Add the course_id to employer's endorsed_courses array in AppDB.employers
        result2 = mongo.cx['AppDB'].employers.update_one(
            {'_id': employer_id},
            {'$addToSet': {'endorsed_courses': ObjectId(course_id)}}
        )
        
        # Verify if the employer's endorsed_courses was successfully updated
        if result2.modified_count == 1:
            # Fetch the updated employer document for verification and convert _id fields to strings
            updated_employer = mongo.cx['AppDB'].employers.find_one({'_id': employer_id})
            if updated_employer:
                # Convert the ObjectId fields to strings for JSON serialization
                updated_employer = convert_objectid(updated_employer)
            return jsonify({"message": "Endorsement added successfully.", "employer": updated_employer}), 200
        else:
            return jsonify({"error": "Failed to update employer's endorsed courses."}), 500
    else:
        return jsonify({"error": "Failed to add endorsement. Course not found or course already endorsed."}), 404


if __name__ == '__main__':
    app.register_blueprint(allcourses_bp)
    app.run(debug=True)
