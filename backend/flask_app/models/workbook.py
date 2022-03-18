
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
        query = """INSERT INTO workbooks(name,description, number_of_chapters, author_id) 
        values(%(name)s, %(description)s,%(number_of_chapters)s, %(author_id)s)"""
        return connectToMySQL().query_db(query,data)
        


    @classmethod
    def validate_data(cls,data):
        errors = {}

        if not len(data["name"]) > 2:
            errors["name"] = "Workbook Name needs to more than two characters"
        if not len(data["description"]) > 2:
            errors["description"] = "Workbook description needs to more than two characters"
        if not data["number_of_chapters"].isdigit():
            errors["number_of_chapters"] = "Number of Chapters should be number"
        if not "author_id" in data.keys():
            errors["author_id"] = "Author ID is missing"
        return errors
    
    @staticmethod
    def get_workbooks_by_author_id(id):
        data = {"id": id}
        query = "SELECT * from workbooks where author_id = %(id)s"
        return connectToMySQL().query_db(query,data)
    
    @staticmethod
    def get_all_workbooks():
        query = "SELECT * from workbooks"
        return connectToMySQL().query_db(query)


