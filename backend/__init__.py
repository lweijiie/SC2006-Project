from flask import Flask
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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

# jobseekers collection in MongoDB
try:
    jobseekers = client.AppDB.jobseekers
except AttributeError as e:
    print(f"Error accessing users collection: {e}")
    
try:
    employers = client.AppDB.employers
except AttributeError as e:
    print(f"Error accessing users collection: {e}")

try:

    courses = client.SkillsFutureDB.SkillsFutureCourses
except AttributeError as e:
    print(f"Error accessing courses collection: {e}")

from routes.auth import auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')

