from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
from enum import Enum

uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
mongo = PyMongo(app)
bcrypt = Bcrypt(app)  # For hashing passwords

# Users collection in MongoDB
try:

    users = client.AppDB.users
except AttributeError as e:
    print(f"Error accessing users collection: {e}")

try:

    courses = client.SkillsFutureDB.SkillsFutureCourses
except AttributeError as e:
    print(f"Error accessing courses collection: {e}")

class UserType(Enum):
    JOB_SEEKER = "Job Seeker"
    EMPLOYER = "Employer"
    
# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    industry = data.get('industry')
    user_type = data.get('user_type')

    # Validate user_type
    if user_type not in [UserType.JOB_SEEKER.value, UserType.EMPLOYER.value]:
        return jsonify({'message': 'Invalid user type'}), 400

    # Check if user already exists based on email
    if users.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert new user with email, industry, and user_type
    users.insert_one({
        'email': email,
        'first_name' : first_name,
        'last_name' : last_name,
        'password': hashed_password,
        'industry': industry,
        'user_type': user_type
    })

    return jsonify({'message': 'User registered successfully!'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Find the user by email
    user = users.find_one({'email': email})

    # Check if user exists and password is correct
    if user and bcrypt.check_password_hash(user['password'], password):
        # Return the user_id along with the success message
        return jsonify({
            'message': 'Login successful!',
            'user_id': str(user['_id'])  # Convert ObjectId to string
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

    
# Update User Details (new route)
@app.route('/update-profile/<user_id>', methods=['POST'])
def update_profile(user_id):
    data = request.json

    # Get the new details from the request body
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    industry = data.get('industry')
    user_type = data.get('user_type')

    # Build the update dictionary dynamically based on the fields provided
    update_fields = {}

    if email:
        update_fields['email'] = email
    if first_name:
        update_fields['first_name'] = first_name
    if last_name:
        update_fields['last_name'] = last_name
    if password:
        # Hash the new password before updating
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        update_fields['password'] = hashed_password
    if industry:
        update_fields['industry'] = industry
    if user_type:
        update_fields['user_type'] = user_type

    # Find the user by ID and update their profile
    try:
        result = users.update_one(
            {'_id': ObjectId(user_id)},  # Find the user by ID
            {'$set': update_fields}  # Update new fields dynamically
        )
        if result.modified_count > 0:
            return jsonify({'message': 'Profile updated successfully!'}), 200
        else:
            return jsonify({'message': 'No changes made or user not found'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    try:
        # Find the user by ID and exclude the password field from the result
        user = users.find_one(
            {'_id': ObjectId(user_id)},
            {'password': 0}  # Exclude the password field
        )

        if user:
            # Convert ObjectId to string before returning the user document
            user['_id'] = str(user['_id'])

            # Return the user details including new fields
            return jsonify({
                'message': 'User profile retrieved successfully!',
                'user': {
                    'email': user.get('email'),
                    'first_name': user.get('first_name'),
                    'last_name': user.get('last_name'),
                    'industry': user.get('industry'),
                    'user_type': user.get('user_type')
                }
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    # Get matched courses based on user's industry with pagination
@app.route('/get-personalised-courses/<user_id>', methods=['GET'])
def get_courses(user_id):
    try:
        # Step 1: Find the user by ID and get their industry
        user = users.find_one({'_id': ObjectId(user_id)})
        
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
    
# if __name__ == '__main__':
#   app.run(debug=True)
