from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from backend.appbackup import users, bcrypt

profile_bp = Blueprint('profile', __name__)

# Update User Profile
@profile_bp.route('/<user_id>', methods=['POST'])
def update_profile(user_id):
    data = request.json
    update_fields = {}

    if 'email' in data:
        update_fields['email'] = data['email']
    if 'first_name' in data:
        update_fields['first_name'] = data['first_name']
    if 'last_name' in data:
        update_fields['last_name'] = data['last_name']
    if 'password' in data:
        update_fields['password'] = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    if 'industry' in data:
        update_fields['industry'] = data['industry']
    if 'user_type' in data:
        update_fields['user_type'] = data['user_type']

    result = users.update_one({'_id': ObjectId(user_id)}, {'$set': update_fields})

    if result.modified_count > 0:
        return jsonify({'message': 'Profile updated successfully!'}), 200
    else:
        return jsonify({'message': 'No changes made or user not found'}), 400

# Get User Profile
@profile_bp.route('/<user_id>', methods=['GET'])
def get_profile(user_id):
    user = users.find_one({'_id': ObjectId(user_id)}, {'password': 0})

    if user:
        user['_id'] = str(user['_id'])
        return jsonify({
            'message': 'User profile retrieved successfully!',
            'user': user
        }), 200
    else:
        return jsonify({'message': 'User not found'}), 404
