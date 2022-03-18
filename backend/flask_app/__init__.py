from flask import Flask
from secrets import token_urlsafe
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = token_urlsafe(16)
