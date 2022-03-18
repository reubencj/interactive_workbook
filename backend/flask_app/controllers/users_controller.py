
import re
from flask_app import app
from flask_app.models.user import User
from flask import redirect, render_template, request, jsonify
from flask_bcrypt import Bcrypt

# creating a bcyrpt object
bcrypt = Bcrypt(app)

# api endpoint to create a new user
@app.route("/create_user", methods=["POST"])
def create_user():
   data =  {"first_name": request.json["first_name"].lower().strip(),
        "last_name": request.json["last_name"].lower().strip(),
        "email": request.json["email"].lower().strip(),
        "is_author": int(request.json["is_author"]),
        "password": request.json["password"],
        "confirm_password": request.json["confirm_password"]
        }

   #validate to see if there is any data validation issues
   errors = User.validate_user(data)
   if errors:
      return jsonify(errors), 400
   
   #check to see if there is already a user with the same email
   if User.get_user_by_email(data["email"]):
      return jsonify({"email":"email already exists"}), 400
   
   #hash password
   data["password"] = bcrypt.generate_password_hash(data["password"])
   #create user
   User.create_user(data)
   new_user = User.get_user_by_email(data["email"])
   session_data = User.convert_to_user_json(new_user)
   return jsonify(message = "New User Created!",session_data = session_data )


@app.route("/login",methods=['POST'])
def login():
   user = User.get_user_by_email(request.json["login_email"])
   if not user:
      return jsonify({"login_email": "email does not exist, please sign up"}), 400
   
   if not  bcrypt.check_password_hash(user.password, request.json["login_password"]):
      return jsonify( {"login_password": "password does not match"}), 400
   
   session_data = User.convert_to_user_json(user)
   return jsonify(message = "Logged in",session_data = session_data )


@app.route('/test', methods=['POST'])
def testing():
    print(request.json)
    return jsonify(request = "done")

