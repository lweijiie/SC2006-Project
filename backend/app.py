from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.courseroute import courses_bp
from routes.profile import profile_bp

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(courses_bp)
app.register_blueprint(profile_bp)

if __name__ == '__main__':
    app.run(debug=True)
