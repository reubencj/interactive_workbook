from flask import Flask
from secrets import token_urlsafe
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask_jwt_extended import JWTManager
load_dotenv()

app = Flask(__name__)
CORS(app)
app.secret_key = os.environ.get("APP_SECRET")

app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)