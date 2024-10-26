from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.personalisedcourses import personalisedcourses_bp
from routes.allcourses import allcourses_bp
from routes.profile import profile_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(personalisedcourses_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(allcourses_bp)

if __name__ == '__main__':
    app.run(debug=True)
