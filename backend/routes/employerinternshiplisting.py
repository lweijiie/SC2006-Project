from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from datetime import datetime
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

# Edit Internship
@employerinternship_bp.route('/employer/edit-internship/<internship_id>', methods=['PUT'])
@jwt_required()
def edit_internship(internship_id):
    current_user = get_jwt_identity()

    # Verify that the internship exists 
    internship = internships.find_one({"id": ObjectId(internship_id)})
    if not internship:
        return jsonify({"message": "Internship not found."}), 404

    # Verify that the current user is the owner
    if internship["employer_id"] != current_user:
        print("Access denied: The employer IDs do not match.")
        return jsonify({"message": "Access denied. You do not have permission to edit this internship."}), 403

    data = request.json
    if not data:  
        return jsonify({"message": "No fields provided to update."}), 400

    updated_fields = {
        "title": data.get("title", internship["title"]),
        "description": data.get("description", internship["description"]),
        "requirements": data.get("requirements", internship["requirements"]),
        "location": data.get("location", internship["location"]),
        "duration": data.get("duration", internship["duration"]),
        "salary": data.get("salary", internship.get("salary", "Not specified")),
        "updated_date": datetime.utcnow()  # Track the update time
    }

    # Perform the update operation
    result = internships.update_one({"_id": ObjectId(internship_id)}, {"$set": updated_fields})
    if result.modified_count == 0:
        return jsonify({"message": "No changes were made to the internship."}), 200

    return jsonify({"message": "Internship updated successfully", "updated_internship": updated_fields}), 200


@employerinternship_bp.route('/employer/delete-internship/<internship_id>', methods=['DELETE'])
@jwt_required()
def delete_internship(internship_id):
    # Get the current user's ID from the JWT token
    current_user = get_jwt_identity()

    # Verify that the internship exists
    internship = internships.find_one({"_id": ObjectId(internship_id)})
    if not internship:
        return jsonify({"message": "Internship not found."}), 404

    # Verify that the current user is the owner of the internship
    if internship["employer_id"] != current_user:
        return jsonify({"message": "Access denied. You do not have permission to delete this internship."}), 403

    result = internships.delete_one({"_id": ObjectId(internship_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Internship deleted successfully."}), 200
    else:
        return jsonify({"message": "Failed to delete internship."}), 500

@employerinternship_bp.route('/employer-internships/<employer_id>', methods=['GET'])
@jwt_required()
def get_employer_internships(employer_id):
    current_user = get_jwt_identity()
    
    # Check if the current user is the employer requesting their own internships
    if current_user != employer_id:
        return jsonify({"message": "Access denied"}), 403

    # Query the internships collection for the given employer_id
    employer_internships = internships.find({"employer_id": employer_id})
    internship_list = [
        {
            "_id": str(internship["_id"]),
            "title": internship.get("title", ""),
            "description": internship.get("description", ""),
            "requirements": internship.get("requirements", ""),
            "location": internship.get("location", ""),
            "duration": internship.get("duration", ""),
            "salary": internship.get("salary", ""),
            "posted_date": internship.get("posted_date", "")
        }
        for internship in employer_internships
    ]

    return jsonify({"internships": internship_list}), 200
