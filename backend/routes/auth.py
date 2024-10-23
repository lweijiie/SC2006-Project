from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from backend.models.models import UserType
from backend.appbackup import users, bcrypt

auth_bp = Blueprint('auth', __name__)

# Register route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    industry = data.get('industry')
    user_type = data.get('user_type')

    if user_type not in [UserType.JOB_SEEKER.value, UserType.EMPLOYER.value]:
        return jsonify({'message': 'Invalid user type'}), 400

    if users.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.insert_one({
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'password': hashed_password,
        'industry': industry,
        'user_type': user_type
    })

    return jsonify({'message': 'User registered successfully!'}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users.find_one({'email': email})

    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({
            'message': 'Login successful!',
            'user_id': str(user['_id'])
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401
