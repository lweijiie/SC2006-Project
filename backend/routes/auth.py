from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from models.models import UserType
from flask_jwt_extended import create_access_token
from datetime import timedelta
#hello testing git
# Initialize the blueprint
auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
jobseekers = client.AppDB.jobseekers
employers = client.AppDB.employers


@auth_bp.route('/register-jobseeker', methods=['POST'])
def register_jobseeker():
    data = request.json
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    industry = data.get('industry')
    user_type = UserType.JOB_SEEKER.value

    # Check if user already exists based on email
    if jobseekers.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert new user with email, industry, and user_type
    jobseekers.insert_one({
        'email': email,
        'first_name' : first_name,
        'last_name' : last_name,
        'password': hashed_password,
        'industry': industry,
        'user_type': user_type
    })

    return jsonify({'message': 'User registered successfully!'}), 201

@auth_bp.route('/register-employer', methods=['POST'])
def register_employer():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_type = UserType.EMPLOYER.value

    # Check if user already exists based on email
    if employers.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert new user with email, industry, and user_type
    employers.insert_one({
        'email': email,
        'password': hashed_password,
        'user_type': user_type
    })

    return jsonify({'message': 'User registered successfully!'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user_type = data.get('user_type')  # Job Seeker or Employer from the front-end button

    # Validate user_type
    if user_type not in [UserType.JOB_SEEKER.value, UserType.EMPLOYER.value]:
        return jsonify({'message': 'Invalid user type'}), 400

    # Check the appropriate collection based on the user_type
    if user_type == UserType.JOB_SEEKER.value:
        user = jobseekers.find_one({'email': email})
    elif user_type == UserType.EMPLOYER.value:
        user = employers.find_one({'email': email})

    # Validate user existence and password match
    if user and bcrypt.check_password_hash(user['password'], password):
        # Create a JWT token with the user's ID as the identity
        access_token = create_access_token(
            identity=str(user['_id']),
            expires_delta=timedelta(hours=1)  # Token expires in 1 hour, After logging in, the client should save the access_token and send it in the Authorization header for any protected endpoints, Authorization: Bearer <access_token>
        )
        
        return jsonify({
            'message': 'Login successful!',
            'user_id': str(user['_id']),
            'user_type': user_type
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

