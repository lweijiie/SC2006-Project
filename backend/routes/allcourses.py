from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

allcourses_bp = Blueprint('allcourses', __name__)

app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/SkillsFutureDB?retryWrites=true&w=majority&appName=CareerPathNow"  # Set MongoDB URI in Flask config
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here' 
jwt = JWTManager(app)

def convert_objectid(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: convert_objectid(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    return obj

@allcourses_bp.route('/api/courses', methods=['GET'])
def get_courses():
    courses = mongo.db.SkillsFutureCourses.find()  
    courses_list = list(courses)  

    for course in courses_list:
        course['_id'] = str(course['_id'])  
        if 'endorsement' not in course:
            course['endorsement'] = 0  

    courses_list = convert_objectid(courses_list)

    return jsonify(courses_list), 200 

@app.route('/endorse_course/<course_id>', methods=['POST'])
@jwt_required()
def endorse_course(course_id):
    current_user_id = get_jwt_identity()  
    print("Current user id:", current_user_id)
    
    try:
        employer_id = ObjectId(current_user_id)
    except Exception as e:
        return jsonify({"error": "Invalid user ID format."}), 400
    
    employer = mongo.cx['AppDB'].employers.find_one({'_id': employer_id})
    
    print("Employer document:", employer)
    
    if not employer:
        return jsonify({"error": "Employer not found."}), 404
    
    result = mongo.cx['SkillsFutureDB'].SkillsFutureCourses.update_one(
        {'_id': ObjectId(course_id)},
        {
            '$addToSet': {'endorsed_by': employer_id},  # Use _id instead of email
            '$inc': {'endorsement': 1}  # Increment the endorsement counter by 1
        }
    )

    if result.modified_count == 1:
        # Add the course_id to employer's endorsed_courses array in AppDB.employers
        result2 = mongo.cx['AppDB'].employers.update_one(
            {'_id': employer_id},
            {'$addToSet': {'endorsed_courses': ObjectId(course_id)}}
        )
        
        if result2.modified_count == 1:
            updated_employer = mongo.cx['AppDB'].employers.find_one({'_id': employer_id})
            if updated_employer:
                updated_employer = convert_objectid(updated_employer)
            return jsonify({"message": "Endorsement added successfully.", "employer": updated_employer}), 200
        else:
            return jsonify({"error": "Failed to update employer's endorsed courses."}), 500
    else:
        return jsonify({"error": "Failed to add endorsement. Course not found or course already endorsed."}), 404

@app.route('/remove_endorsement/<course_id>', methods=['POST'])
@jwt_required()
def remove_endorsement(course_id):
    current_user_id = get_jwt_identity()  
    print("Current user id:", current_user_id)

    try:
        employer_id = ObjectId(current_user_id)
    except Exception as e:
        return jsonify({"error": "Invalid user ID format."}), 400

    employer = mongo.cx['AppDB'].employers.find_one({'_id': employer_id})
    
    print("Employer document:", employer)

    if not employer:
        return jsonify({"error": "Employer not found."}), 404

    result = mongo.cx['SkillsFutureDB'].SkillsFutureCourses.update_one(
        {'_id': ObjectId(course_id)},
        {
            '$pull': {'endorsed_by': employer_id}, 
            '$inc': {'endorsement': -1}  
        }
    )

    if result.modified_count == 1:
        result2 = mongo.cx['AppDB'].employers.update_one(
            {'_id': employer_id},
            {'$pull': {'endorsed_courses': ObjectId(course_id)}}
        )

        if result2.modified_count == 1:
            updated_employer = mongo.cx['AppDB'].employers.find_one({'_id': employer_id})
            if updated_employer:
                updated_employer['_id'] = str(updated_employer['_id'])
                updated_employer['endorsed_courses'] = [str(cid) for cid in updated_employer.get('endorsed_courses', [])]
            return jsonify({"message": "Endorsement removed successfully.", "employer": updated_employer}), 200
        else:
            return jsonify({"error": "Failed to update employer's endorsed courses."}), 500
    else:
        return jsonify({"error": "Failed to remove endorsement. Course not found or endorsement not present."}), 404

@app.route('/endorsed_courses', methods=['GET'])
@jwt_required()
def get_endorsed_courses():
    employer_id = get_jwt_identity()  

    try:
        employer_object_id = ObjectId(employer_id)
    except Exception as e:
        return jsonify({"error": "Invalid employer ID format."}), 400

    endorsed_courses = list(mongo.cx['SkillsFutureDB'].SkillsFutureCourses.find(
        {"endorsed_by": employer_object_id}
    ))

    for course in endorsed_courses:
        course['_id'] = str(course['_id'])
        course['endorsed_by'] = [str(e_id) for e_id in course.get('endorsed_by', [])]

    return jsonify({"endorsed_courses": endorsed_courses}), 200


if __name__ == '__main__':
    app.register_blueprint(allcourses_bp)
    app.run(debug=True)
