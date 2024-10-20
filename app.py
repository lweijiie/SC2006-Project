from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId

uri = ""
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = uri
bcrypt = Bcrypt(app)  # For hashing passwords

# Users collection in MongoDB
try:

    users = client.AppDB.users
except AttributeError as e:
    print(f"Error accessing users collection: {e}")


# Register endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if user already exists
    if users.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400

    # Hash the password
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    # Insert new user
    users.insert_one({'username': username, 'password': hashed_password})

    return jsonify({'message': 'User registered successfully!'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Find the user by username
    user = users.find_one({'username': username})

    # Check if user exists and password is correct
    if user and bcrypt.check_password_hash(user['password'], password):
        # Return the user_id along with the success message
        return jsonify({
            'message': 'Login successful!',
            'user_id': str(user['_id'])  # Convert ObjectId to string
        }), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

    
# Update User Details (new route)
@app.route('/update-profile/<user_id>', methods=['POST'])
def update_profile(user_id):
    data = request.json

    # Get the new details from the request body
    gender = data.get('gender')
    date_of_birth = data.get('date_of_birth')  # Assuming date is sent in YYYY-MM-DD format

    # Find the user by ID and update their profile
    try:
        result = users.update_one(
            {'_id': ObjectId(user_id)},  # Find the user by ID
            {'$set': {'gender': gender, 'date_of_birth': date_of_birth}}  # Update new fields
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
        # Find the user by ID
        user = users.find_one({'_id': ObjectId(user_id)}, {'password': 0})  # Exclude password from the result

        if user:
            # Convert ObjectId to string before returning the user document
            user['_id'] = str(user['_id'])

            return jsonify({
                'message': 'User profile retrieved successfully!',
                'user': user  # Return user details
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
