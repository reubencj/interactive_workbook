from crypt import methods
import imp
from flask_app import app
from flask_app.models.workbook import Workbook
from flask import request, jsonify



@app.route("/create_workbook", methods = ["POST"])
def create_workbook():
    data = {
        "name": request.json["name"], 
        "description": request.json["description"], 
        "number_of_chapters": request.json["number_of_chapters"],
        "author_id":request.json["author_id"]
    }
    errors = Workbook.validate_data(data)

    if errors:
        return jsonify(errors), 400

    data["number_of_chapters"] = int(data["number_of_chapters"])
    data["author_id"] = int(data["author_id"])
    
    workbook_id = Workbook.create_workbook(data)
    return jsonify(workbook_id = workbook_id)
