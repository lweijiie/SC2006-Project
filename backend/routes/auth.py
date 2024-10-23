from flask import Blueprint, request, jsonify
from __init__ import bcrypt, jobseekers, employers  # Import only the necessary things
from models.models import UserType  # Assuming UserType is in models.py

auth_bp = Blueprint('auth', __name__)

# Register jobseeker route
@auth_bp.route('/register-jobseeker', methods=['POST'])
def register_jobseeker():
    data = request.json
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    industry = data.get('industry')

    # Validate data
    if not email or not first_name or not last_name or not password or not industry:
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if Jobseeker already exists
    if jobseekers.find_one({'email': email}):
        return jsonify({'message': 'Jobseeker already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert new Jobseeker into jobseekers collection
    jobseekers.insert_one({
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'password': hashed_password,
        'industry': industry,
        'user_type': UserType.JOB_SEEKER.value
    })

    return jsonify({'message': 'Jobseeker registered successfully!'}), 20

# Register employer route
@auth_bp.route('/register-employer', methods=['POST'])
def register_employer():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Validate data
    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if Employer already exists
    if employers.find_one({'email': email}):
        return jsonify({'message': 'Employer already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert new Employer into employers collection
    employers.insert_one({
        'email': email,
        'password': hashed_password,
        'user_type': UserType.EMPLOYER.value
    })

    return jsonify({'message': 'Employer registered successfully!'}), 201

# Login route
# Login route for both Jobseekers and Employers
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
        return jsonify({
            'message': 'Login successful!',
            'user_id': str(user['_id']),
            'user_type': user_type
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401