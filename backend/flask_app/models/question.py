import imp
from flask_app.config.mysqlconnection import connectToMySQL




class Question:
    def __init__(self, data) -> None:
        self.id = data["id"]
        self.content = data["content"]
        self.question_number = data["question_number"]
        self.chapters_id = data["chapters_id"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
    

    @classmethod
    def create_question(cls, data):
        query = """INSERT INTO questions(content, question_number,chapters_id)
        values(%(content)s, %(question_number)s, %(chapters_id)s)"""
        return connectToMySQL().query_db(query,data)
    


    

    @staticmethod
    def get_all_questions_by_chapter_id( id):
        data = {"id": id}
        query = "select * from question where chapters_id = %(id)s"
        return connectToMySQL().query_db(query, data)
    

    @staticmethod
    def update_questions(data):
        query = "UPDATE questions SET content = %(content)s where id = %(id)s"
        return connectToMySQL().query_db(query, data)
    
    @staticmethod
    def save_all_responses_for_questions(data):
        query= "INSERT INTO response(response_text, questions_id, users_id) values(%(response_text)s, %(questions_id)s, %(users_id)s)"
        return connectToMySQL().exequte_many_query(query, data)
    

    @staticmethod
    def update_all_responses(data):
        query= "UPDATE response SET response_text = %(response_text)s where id = %(id)s"
        return connectToMySQL().exequte_many_query(query, data)

