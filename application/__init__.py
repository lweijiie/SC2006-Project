from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["SECRECT_KEY"] = "123"
app.config["MONGO_URI"] = "mongodb+srv://user:sc2006@careerpathnow.1wsqb.mongodb.net/?retryWrites=true&w=majority&appName=CareerPathNow"

# setup mongodb
mongodb_client = PyMongo(app)
db = mongodb_client.db

from application import routes