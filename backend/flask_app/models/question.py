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
    def get_questions_and_response( chapters_id, users_id):
        data = {"chapters_id": chapters_id, "users_id": users_id}
        query = """select q.id questions_id, q.content, question_number, r.id response_id, response_text, users_id  
        from questions q left join response r on r.questions_id = q.id and r.users_id = %(users_id)s where q.chapters_id = %(chapters_id)s"""
        return connectToMySQL().query_db(query, data)
    

    @staticmethod
    def update_questions(data):
        query = "UPDATE questions SET content = %(content)s where id = %(id)s"
        return connectToMySQL().query_db(query, data)
    
    @staticmethod
    def save_response(response_text, users_id, questions_id):
        data = {"response_text": response_text, "users_id": users_id, "questions_id": questions_id  }
        query= "INSERT INTO response(response_text, questions_id, users_id) values(%(response_text)s, %(questions_id)s, %(users_id)s)"
        return connectToMySQL().query_db(query, data)
    

    @staticmethod
    def update_response(response_id, response_text):
        data = {"id": response_id, "response_text":response_text }
        query= "UPDATE response SET response_text = %(response_text)s where id = %(id)s"
        return connectToMySQL().query_db(query, data)
    
    @staticmethod 
    def get_questions_by_chapter_id(id):
        query = """select *  from questions 
                where chapters_id = %(id)s"""
        data = {"id" : id}
        return connectToMySQL().query_db(query,data)

