from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routes.auth import auth_bp
from routes.personalisedcourses import personalisedcourses_bp
from routes.allcourses import allcourses_bp
from routes.profile import profile_bp
from routes.employerinternshiplisting import employerinternship_bp

app = Flask(__name__)
CORS(app)

# Set up JWT secret key (change this to a strong, unique key in production)
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'

#Initialise JWTManager
jwt = JWTManager(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(personalisedcourses_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(allcourses_bp)
app.register_blueprint(employerinternship_bp)

if __name__ == '__main__':
    app.run(debug=True)
