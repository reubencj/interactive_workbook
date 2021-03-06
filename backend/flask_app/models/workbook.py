
from flask_app.config.mysqlconnection import connectToMySQL



class Workbook:

    def __init__(self,data) -> None:
        self.id = data["id"]
        self.name = data["name"]
        self.description = data["description"]
        self.number_of_chapters = data["number_of_chapters"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.author_id = data["author_id"]

        self.chapters = []
        self.author = None
    

    @staticmethod
    def create_workbook( data):
        query = """INSERT INTO workbooks(name,description,  author_id) 
        values(%(name)s, %(description)s, %(author_id)s)"""
        return connectToMySQL().query_db(query,data)
        


    @classmethod
    def validate_data(cls,data):
        errors = {}

        if not len(data["name"]) > 2:
            errors["name"] = "Workbook Name needs to more than two characters"
        if not len(data["description"]) > 2:
            errors["description"] = "Workbook description needs to more than two characters"
       
        if not "author_id" in data.keys():
            errors["author_id"] = "Author ID is missing"
        return errors
    
    @staticmethod
    def get_workbooks_by_author_id(id):
        data = {"id": id}
        query = "SELECT * from workbooks where author_id = %(id)s"
        return connectToMySQL().query_db(query,data)
    
    @staticmethod
    def get_all_workbooks(id):
        data = {"id":id}
        query = """SELECT w.*, CONCAT(UPPER(SUBSTRING(u.first_name,1,1)),LOWER(SUBSTRING(u.first_name,2)), ' ',UPPER(SUBSTRING(u.last_name,1,1)),LOWER(SUBSTRING(u.last_name,2))) author_name, if(aw.users_id, true, false) workbook_added from workbooks w join users u on u.id = w.author_id left join added_workbooks aw on w.id = aw.workbooks_id and aw.users_id = %(id)s"""
        return connectToMySQL().query_db(query,data)

    @staticmethod
    def update_workbook(data):
        query = """UPDATE workbooks SET name = %(name)s, description = %(description)s where id = %(id)s and author_id = %(author_id)s"""
        return connectToMySQL().query_db(query,data)

    @staticmethod
    def author_get_one_workbook(workbooks_id, author_id):
        data = {"workbooks_id": workbooks_id, "author_id": author_id}
        query = "SELECT * from workbooks where id = %(workbooks_id)s and author_id = %(author_id)s"
        return connectToMySQL().query_db(query,data)

    @staticmethod
    def workbook_added_by_user(users_id, workbooks_id):
        data = {"users_id": users_id, "workbooks_id": workbooks_id}
        query = "INSERT INTO added_workbooks(workbooks_id, users_id) values(%(workbooks_id)s,%(users_id)s)"
        return connectToMySQL().query_db(query,data)

    @staticmethod
    def get_one_workbook(workbooks_id):
        data = {"workbooks_id": workbooks_id}
        query = "SELECT * from workbooks where id = %(workbooks_id)s"
        return connectToMySQL().query_db(query,data)
    
    @staticmethod
    def delete_workbook_by_id(id, author_id):
        data = {"id": id, "author_id": author_id}
        query = "DELETE FROM workbooks where id = %(id)s and author_id = %(author_id)s"
        return connectToMySQL().query_db(query,data)
