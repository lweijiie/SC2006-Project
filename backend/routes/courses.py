from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from backend.appbackup import users, courses

courses_bp = Blueprint('courses', __name__)

# Get matched courses based on user's industry with pagination
@courses_bp.route('/get-personalised-courses/<user_id>', methods=['GET'])
def get_courses(user_id):
    try:
        user = users.find_one({'_id': ObjectId(user_id)})
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        industry = user.get('industry')
        if not industry:
            return jsonify({'message': 'User does not have an industry specified'}), 400

        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        query = {"areaOfTrainings.description": industry}
        skip = (page - 1) * per_page

        matched_courses = list(courses.find(query).skip(skip).limit(per_page))

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
