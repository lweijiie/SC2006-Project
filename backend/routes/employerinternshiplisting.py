from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from models.models import UserType
from datetime import datetime, timedelta
from bson import ObjectId

# Initialize the blueprint
employerinternship_bp = Blueprint('employerinternship_bp', __name__)
bcrypt = Bcrypt()
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
jobseekers = client.AppDB.jobseekers
employers = client.AppDB.employers
internships = client.InternshipDB.Internships 

# Create Internship
@employerinternship_bp.route('/employer/post-internship', methods=['POST'])
@jwt_required()
def create_internship():

    current_user = get_jwt_identity()  # Get the current user's identity from the token

    # Verify that the current user is an employer
    employer = employers.find_one({"_id": ObjectId(current_user)})
    if not employer:
        return jsonify({"message": "Access denied. Only employers can create internships."}), 403

    data = request.json
    
    internship = {
        "employer_id": current_user,
        "title": data['title'],
        "description": data['description'],
        "requirements": data['requirements'],
        "location": data['location'],
        "duration": data['duration'],
        "salary": data.get('salary', 'Not specified'),
        "posted_date": datetime.utcnow()
    }
    internship_id = internships.insert_one(internship).inserted_id
    return jsonify({"message": "Internship created successfully", "internship_id": str(internship_id)}), 201
