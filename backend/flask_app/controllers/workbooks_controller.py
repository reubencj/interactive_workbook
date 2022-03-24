from crypt import methods
from unittest import result
from flask_app import app
from flask_app.models.workbook import Workbook
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_app.models.user import User
from flask_app import jwt






@app.route("/create_workbook", methods = ["POST"])
@jwt_required()
def create_workbook():

    user = get_jwt_identity()

    
    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    data = {
        "name": request.json["name"], 
        "description": request.json["description"], 
        "author_id":user["user_id"]
    }
    errors = Workbook.validate_data(data)
    
    if errors:
        return jsonify(errors), 400

    
    data["author_id"] = int(data["author_id"])
    
    workbook_id = Workbook.create_workbook(data)
    return jsonify(workbook_id = workbook_id)


@app.route("/get_author_workbooks")
@jwt_required()
def get_author_workbooks():
    user = get_jwt_identity()

    
    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    
    result = Workbook.get_workbooks_by_author_id(user["user_id"])
    print(result)
    return jsonify(result = result)



@app.route("/get_all_workbooks")
@jwt_required()
def get_all_workbooks():
    user_id = get_jwt_identity()["user_id"]
    result = Workbook.get_all_workbooks(user_id)
    return jsonify(result = result)

@app.route("/add_workbook/<int:workbooks_id>")
@jwt_required()
def add_workbook(workbooks_id):
    user = get_jwt_identity()

    
    result = Workbook.workbook_added_by_user(user["user_id"],workbooks_id)
    return jsonify(result = result)


@app.route("/workbook_summary/<int:workbook_id>")
@jwt_required()
def get_summary(workbook_id):
    
    user = get_jwt_identity()

    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    result = Workbook.get_one_workbook(workbook_id)[0]
    return jsonify(result = result)


@app.route("/update_workbook", methods = ["POST"])
@jwt_required()
def update_workbook():
    user = get_jwt_identity()

    
    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    
    data = {
        "name": request.json["name"], 
        "description": request.json["description"], 
        "author_id": user["user_id"],
        "id": request.json["id"]
    }
    errors = Workbook.validate_data(data)
    
    if errors:
        return jsonify(errors), 400

    
    data["author_id"] = int(data["author_id"])
    data["id"] = int(data["id"])
    print(data)

    result = Workbook.update_workbook(data)

    return jsonify(result = errors)

@app.route("/delete_workbook", methods = ["POST"])
@jwt_required()
def delete_workbook():
    user = get_jwt_identity()

    
    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    id = request.json["id"]

    result = Workbook.delete_workbook_by_id(id,user["user_id"])
    return jsonify(result = result)