from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from models.models import UserType
from datetime import datetime, timedelta
from bson import ObjectId
from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

# Initialize the blueprint
jobseekerinternship_bp = Blueprint('jobseekerinternship_bp', __name__)
bcrypt = Bcrypt()
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
jobseekers = client.AppDB.jobseekers
employers = client.AppDB.employers
internships = client.InternshipDB.Internships 

"""# Flask app initialization
app = Flask(__name__)
app.config['MONGO_URI'] = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/SkillsFutureDB?retryWrites=true&w=majority&appName=CareerPathNow"  # Set MongoDB URI in Flask config
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'  # Change this to a random secret key
jwt = JWTManager(app)"""

# Get Internship by ID
@jobseekerinternship_bp.route('/internship/<internship_id>', methods=['GET'])
@jwt_required()  # only logged-in users can access this route
def get_internship_by_id(internship_id):
    # Find the internship by ID
    internship = internships.find_one({"_id": ObjectId(internship_id)})
    if not internship:
        return jsonify({"message": "Internship not found."}), 404

    # Prepare the internship data for response (convert ObjectId to string)
    internship_data = {
        "_id": str(internship["_id"]),
        "title": internship.get("title"),
        "description": internship.get("description"),
        "requirements": internship.get("requirements"),
        "location": internship.get("location"),
        "duration": internship.get("duration"),
        "salary": internship.get("salary", "Not specified"),
        "employer_id": internship.get("employer_id"),  # Optional: Decide if you want to expose this
        "posted_date": internship.get("posted_date")
    }

    return jsonify({"message": "Internship retrieved successfully", "internship": internship_data}), 200


#List all internships
@jobseekerinternship_bp.route('/internships', methods=['GET'])
@jwt_required()  
def list_internships():
    page = int(request.args.get('page', 1))  # Default to page 1 if not provided
    per_page = int(request.args.get('per_page', 10))  # Default to 10 items per page

    skip = (page - 1) * per_page
    limit = per_page

    # Fetch internships from the database
    internships_cursor = internships.find().skip(skip).limit(limit)
    internships_list = []

    for internship in internships_cursor:
        internships_list.append({
            "id": str(internship["_id"]),
            "title": internship.get("title"),
            "description": internship.get("description"),
            "requirements": internship.get("requirements"),
            "location": internship.get("location"),
            "duration": internship.get("duration"),
            "salary": internship.get("salary", "Not specified"),
            "posted_date": internship.get("posted_date")
        })

    response_data = {
        "page": page,
        "per_page": per_page,
        "total": internships.count_documents({}),
        "internships": internships_list
    }

    return jsonify(response_data), 200
