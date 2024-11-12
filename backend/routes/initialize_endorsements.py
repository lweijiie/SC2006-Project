from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask import Flask

# Connect to MongoDB
bcrypt = Bcrypt()
uri = "mongodb+srv://SC2006:Apple12345@careerpathnow.tpgyu.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"
client = MongoClient(uri)
jobseekers = client.AppDB.jobseekers
employers = client.AppDB.employers
internships = client.InternshipDB.Internships 

# Connect to MongoDB
client = MongoClient(uri)
db = client["SkillsFutureDB"]
courses_collection = db['SkillsFutureCourses']  # Assume 'courses' is your collection name

app = Flask(__name__)


courses_collection.update_many(
    {"endorsement": {"$exists": False}},  # Filter documents without "endorsement"
    {"$set": {"endorsements": 0}}  # Add the endorsement field with default value 0
)

print("Endorsement field initialized for all courses without it.")

