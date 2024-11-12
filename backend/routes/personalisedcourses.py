from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson.objectid import ObjectId

# Initialize the blueprint
personalisedcourses_bp = Blueprint('personalisedcourses', __name__)
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
courses = client.SkillsFutureDB.SkillsFutureCourses
jobseekers = client.AppDB.jobseekers

# Helper function to convert ObjectId to string
def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: convert_objectid(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    return obj

@personalisedcourses_bp.route('/get-personalised-courses/<user_id>', methods=['GET'])
@jwt_required()
def get_courses(user_id):

    current_user = get_jwt_identity()

    # Ensure the user is authorised to access this profile
    if current_user != user_id:
        return jsonify({"message": "Access denied"}), 403

    try:
        # Step 1: Find the user by ID and get their industry
        user = jobseekers.find_one({'_id': ObjectId(user_id)})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        industry = user.get('industry')
        if not industry:
            return jsonify({'message': 'User does not have an industry specified'}), 400
        
        industry_list = [industry, "Others", "Personal Development"]

        page = int(request.args.get('page', 1))  # Default to page 1 if not provided
        if page < 1 or page > 100:
            return jsonify({'message': 'Page must be within [1,100]'}), 400
        
        per_page = int(request.args.get('per_page', 10))  # Default to 10 courses per page
        if per_page < 1 or per_page > 50:  # Adjusting the per_page limit to be a bit more flexible
            return jsonify({'message': 'Per_Page must be within [1,50]'}), 400

        training_type = request.args.get('modeOfTrainings')

        query = {"areaOfTrainings.description": {"$in": industry_list}}
        
        if training_type:
            query["modeOfTrainings.description"] = training_type

        skip = (page - 1) * per_page

        matched_courses = list(courses.find(query).skip(skip).limit(per_page))

        if not matched_courses:
            return jsonify({'message': 'No courses found for the given filters'}), 404

        # Step 4: Convert ObjectId to string and prepare the response
        matched_courses = [convert_objectid(course) for course in matched_courses]

        return jsonify({
            'message': f'Courses for industry {industry} retrieved successfully!',
            'page': page,
            'per_page': per_page,
            'courses': matched_courses
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
