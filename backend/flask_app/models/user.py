
from email import message
from flask_app.config.mysqlconnection import connectToMySQL

import re

class User:
    def __init__(self, data) -> None:
        self.id = data["id"]
        self.first_name = data["first_name"]
        self.last_name = data["last_name"]
        self.email = data["email"]
        self.password = data["password"]
        self.is_author = data["is_author"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
    

    @classmethod
    def create_user(cls,data):
        
        query = """INSERT INTO users(first_name,last_name, email, password, is_author) 
        values(%(first_name)s, %(last_name)s,%(email)s, %(password)s,%(is_author)s)"""
        connectToMySQL().query_db(query,data)
    
    @classmethod
    def get_user_by_email(cls,email):
        data = {"email": email.lower().strip()}
        query = "SELECT * FROM users where email = %(email)s"
        result =  connectToMySQL().query_db(query,data)
        if result:
            return cls(result[0])


    @staticmethod
    def validate_user(data):
        errors = {}
        name_validation = re.compile(r"[a-zA-Z]{2,}")
        email_validation = re.compile(r"^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$")
        password_length_validation = re.compile(r"[a-zA-z!_#@0-9]{8,}")
        password_number_validation = re.compile(r"[0-9]+")
        password_letter_validation = re.compile(r"[a-zA-Z]+")

        if not name_validation.match(data["first_name"]):
            errors["first_name"] = "First Name must be more than 2 characters"
        if not name_validation.match(data["last_name"]):
            errors["last_name"]  = "Last Name must be more than 2 characters"  
        if not email_validation.match(data["email"]):
            errors["email"] = "Email must have a valid format"
        if not password_length_validation.match(data["password"]) or not password_letter_validation.search(data["password"]) or not password_number_validation.search(data["password"]):
            errors["password"] = "password must be at least 8 characters and must include a number and letter"
        if not "is_author" in data.keys():
            errors["is_author"] = "Is Author needs to be true or false"
        if not data["password"] == data["confirm_password"]:
            errors["confirm_password"] = "Passwords do not match"
        return errors
    
    @staticmethod
    def convert_to_user_json(user):
        
        result = {
            "first_name": user.first_name, 
            "id": user.id,
            "email": user.email, 
            "is_author": user.is_author
        }
        return result

        




