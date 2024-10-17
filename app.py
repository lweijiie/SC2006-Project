from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://user:sc2006@careerpathnow.1wsqb.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

app = Flask(__name__)
CORS(app)

# MongoDB configuration
app.config["MONGO_URI"] = "mongodb+srv://user:sc2006@careerpathnow.1wsqb.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
mongo = PyMongo(app)
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
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Find user in the database
    user = users.find_one({'username': username})

    if user and bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

if __name__ == '__main__':
    app.run(debug=True)
