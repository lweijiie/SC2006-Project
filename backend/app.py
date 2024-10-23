from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_pymongo import PyMongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from routes.auth import auth_bp
from routes.profile import profile_bp
from routes.courses import courses_bp

# App and configurations
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# MongoDB configuration
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri, server_api=ServerApi('1'))

# Test MongoDB connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# MongoDB collections
mongo = PyMongo(app)
users = client.AppDB.users
courses = client.SkillsFutureDB.SkillsFutureCourses

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(profile_bp, url_prefix='/profile')
app.register_blueprint(courses_bp, url_prefix='/courses')

if __name__ == '__main__':
    app.run(debug=True)
