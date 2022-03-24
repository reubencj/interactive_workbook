from crypt import methods
from email import message
from flask_app.models.chapter import Chapter
from flask_app.models.question import Question
from flask_app import app
from flask import request, jsonify
import re
from flask_app import jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_app.models.chapter import Chapter

@app.route("/create_chapter",methods=['POST'])
@jwt_required()
def create_chapter_and_questions():
    
    user = get_jwt_identity()

    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    data = request.json
    chapters_id = Chapter.create_chapter(data)

    print(chapters_id)
    
    get_quest_num = re.compile(r'question(\d+)')

    for q_text,content in data["questions"].items():
        q = {}
        q["chapters_id"] = int(chapters_id)
        q["content"] = content
        num_match = get_quest_num.match(q_text)
        q["question_number"] = num_match.group(1)
        Question.create_question(q)
    
    

    return jsonify(message = "created")


@app.route("/get_chapters/<int:workbook_id>")
@jwt_required()
def get_chapters(workbook_id):
    result = Chapter.get_all_chapters_by_workbook_id(workbook_id)
    if not result:
        return jsonify(message = "workbook not found"), 404
    
    return jsonify(result = result)

@app.route("/chapter_response/<int:chapter_id>")
@jwt_required()
def chapter_response(chapter_id):
    user_id = get_jwt_identity()["user_id"]
    chapter = Chapter.get_chapter_by_id(chapter_id)[0]
    questions = Question.get_questions_and_response(chapter_id,user_id)

    return jsonify(chapter = chapter, questions = questions)

@app.route("/save_response",methods=["POST"])
@jwt_required()
def save_response():
    user_id = get_jwt_identity()["user_id"]
    chapter_id = request.json["chapter_id"]
    responses = request.json["questions"]
    for res in responses:
        if res["response_id"] == None:
            Question.save_response(res["response_text"], user_id,res["questions_id"])
        else:
            Question.update_response(res["response_id"],res["response_text"])


    Chapter.handle_chapter_read(chapter_id,user_id)

    return jsonify(message = "all good")

@app.route("/delete_chapter",methods=["POST"])
@jwt_required()
def delete_chapter():
    user = get_jwt_identity()

    if user["is_author"] == 0:
        return jsonify (message = "not an author"), 401

    result =  Chapter.delete_chapter_by_id(request.json["id"])
    return jsonify(result = result)
