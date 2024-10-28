from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from models.models import UserType
from bson.objectid import ObjectId

# Initialize the blueprint
profile_bp = Blueprint('profile', __name__)
bcrypt = Bcrypt()
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
jobseekers = client.AppDB.jobseekers
employers = client.AppDB.employers

@profile_bp.route('/update-jobseeker-profile/<user_id>', methods=['POST'])
@jwt_required()
def update_jobseeker_profile(user_id):
    data = request.json
    current_user = get_jwt_identity()  # Get the current user's identity from the token

    # Ensure the user is authorised to update this profile
    if current_user != user_id:
        return jsonify({"message": "Access denied"}), 403

    # Get the new details from the request body
    email = data.get('email')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    password = data.get('password')
    industry = data.get('industry')
    education = data.get('education')

    if jobseekers.find_one({'email': email}):
        return jsonify({'message': 'Email already exists'}), 400
    
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
    if education:
        update_fields['education'] = education

    # Find the user by ID and update their profile
    try:
        result = jobseekers.update_one(
            {'_id': ObjectId(user_id)},  # Find the user by ID
            {'$set': update_fields}  # Update new fields dynamically
        )
        if result.modified_count > 0:
            return jsonify({'message': 'Profile updated successfully!'}), 200
        else:
            return jsonify({'message': 'No changes made or user not found'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@profile_bp.route('/jobseeker-profile/<user_id>', methods=['GET'])
@jwt_required()
def get_jobseeker_profile(user_id):

    current_user = get_jwt_identity()  # Get the current user's identity from the token

    # Ensure the user is authorised to access this profile
    if current_user != user_id:
        return jsonify({"message": "Access denied"}), 403

    try:
        # Find the user by ID and exclude the password field from the result
        user = jobseekers.find_one(
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
                    'education' : user.get('education')
                }
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@profile_bp.route('/update-employer-profile/<user_id>', methods=['POST'])
@jwt_required()
def update_employer_profile(user_id):
    data = request.json

    current_user = get_jwt_identity()

    # Ensure the user is authorised to update this profile
    if current_user != user_id:
        return jsonify({"message": "Access denied"}), 403

    # Get the new details from the request body
    email = data.get('email')
    password = data.get('password')
    industry = data.get('industry')
    company_name = data.get('company_name')
    company_description = data.get('company_description')

    if employers.find_one({'email': email}):
        return jsonify({'message': 'Email already exists'}), 400
    
    # Build the update dictionary dynamically based on the fields provided
    update_fields = {}

    if email:
        update_fields['email'] = email
    if password:
        # Hash the new password before updating
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        update_fields['password'] = hashed_password
    if industry:
        update_fields['industry'] = industry
    if company_name:
        update_fields['company_name'] = company_name
    if company_description:
        update_fields['company_description'] = company_description

    # Find the user by ID and update their profile
    try:
        result = employers.update_one(
            {'_id': ObjectId(user_id)},  # Find the user by ID
            {'$set': update_fields}  # Update new fields dynamically
        )
        if result.modified_count > 0:
            return jsonify({'message': 'Profile updated successfully!'}), 200
        else:
            return jsonify({'message': 'No changes made or user not found'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@profile_bp.route('/employer-profile/<user_id>', methods=['GET'])
@jwt_required()
def get_employer_profile(user_id):

    current_user = get_jwt_identity()

    # Ensure the user is authorised to access this profile
    if current_user != user_id:
        return jsonify({"message": "Access denied"}), 403

    try:
        # Find the user by ID and exclude the password field from the result
        user = employers.find_one(
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
                    'industry': user.get('industry'),
                    'company_name' : user.get('company_name'),
                    'company_description' : user.get('company_description')
                }
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
