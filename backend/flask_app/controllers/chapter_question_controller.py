from crypt import methods
from flask_app.models.chapter import Chapter
from flask_app.models.question import Question
from flask_app import app
from flask import request, jsonify
import re

@app.route("/create_chapter",methods=['POST'])
def create_chapter_and_questions():
    data = request.json
    print(data)
    
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
