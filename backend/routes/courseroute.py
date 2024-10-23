from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

# Initialize the blueprint
courses_bp = Blueprint('courses', __name__)
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
courses = client.SkillsFutureDB.SkillsFutureCourses
jobseekers = client.AppDB.jobseekers

@courses_bp.route('/get-personalised-courses/<user_id>', methods=['GET'])
def get_courses(user_id):
    try:
        # Step 1: Find the user by ID and get their industry
        user = jobseekers.find_one({'_id': ObjectId(user_id)})
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        industry = user.get('industry')
        if not industry:
            return jsonify({'message': 'User does not have an industry specified'}), 400

        # Step 2: Get pagination parameters (page number and number of courses per page)
        page = int(request.args.get('page', 1))  # Default to page 1 if not provided
        per_page = int(request.args.get('per_page', 10))  # Default to 10 courses per page

        # Step 3: Query SkillsFutureCourses where areaOfTrainings.description matches the user's industry
        query = {"areaOfTrainings.description": industry}
        skip = (page - 1) * per_page

        matched_courses = list(courses.find(query).skip(skip).limit(per_page))

        # Step 4: Convert ObjectId to string and prepare the response
        for course in matched_courses:
            course['_id'] = str(course['_id'])

        return jsonify({
            'message': f'Courses for industry {industry} retrieved successfully!',
            'page': page,
            'per_page': per_page,
            'courses': matched_courses
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
