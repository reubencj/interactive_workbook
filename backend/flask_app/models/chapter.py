
from flask_app.config.mysqlconnection import connectToMySQL



class Chapter:
    def __init__(self, data) -> None:
        self.id = data["id"]
        self.title = data["title"]
        self.chapter_number = data["chapter_number"]
        self.content = data["content"]
        self.video_url = data["video_url"]
        self.workbooks_id = data["workbooks_id"]
        self.created_at = data["created_at"]
        self.updated_at = data["updated_at"]
        self.questions = []
    

    @staticmethod
    def create_chapter(data):
        
        query = """INSERT INTO chapters(title, chapter_number,content, video_url, workbooks_id ) 
        values(%(title)s,%(chapter_number)s, %(content)s, %(video_url)s, %(workbooks_id)s)"""
        return connectToMySQL().query_db(query, data)
    
    @staticmethod
    def get_chapter_by_id(id):
        data = {"id": id}
        query = "SELECT * FROM chapters where id = %(id)s"
        return connectToMySQL().query_db(query, data)


    @staticmethod
    def update_chapter(data):
        query = "UPDATE chapters SET title = %(title)s content = %(content)s video_url = %(video_url)s where id = %(id)s"
        return connectToMySQL().query_db(query, data)
    
    @staticmethod
    def get_all_chapters_by_workbook_id(id):
        data = {"id": id}
        query = "select * from chapters where workbooks_id = %(id)s order by chapter_number"
        return connectToMySQL().query_db(query, data)

    
    @staticmethod
    def handle_chapter_read(chapter_id,user_id):
        data = {"chapters_id": chapter_id, "users_id": user_id}
        select_query = "select * from read_chapters where users_id = %(users_id)s and chapters_id = %(chapters_id)s"
        is_read = connectToMySQL().query_db(select_query, data)
        if not is_read:
            insert_query = "insert into read_chapters(users_id,chapters_id) values(%(users_id)s,%(chapters_id)s)"
            return connectToMySQL().query_db(insert_query, data)
        return is_read
        

    @staticmethod
    def delete_chapter_by_id(id):
        data = {"id": id}
        query = "DELETE FROM chapters where id = %(id)s"
        return connectToMySQL().query_db(query,data)


