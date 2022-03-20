
import email
from flask_app.models.user import User
from flask import jsonify
from flask_app.models.workbook import Workbook
from flask_app.config.mysqlconnection import connectToMySQL


# workbook_data = {
#     "name": "test 5",
#     "description": "Some description of the workbook",
#     "number_of_chapters": 12,
#     "author_id": 1, 
# }

# # reuben = User.get_user_by_email('reuen@gmail.com')

# # print(reuben)

# print(Workbook.get_all_workbooks())
# # password : 12345678a

res = (connectToMySQL().query_db("""select c.id chapter_id, title, chapter_number, c.content, video_url, q.id question_id, q.content question_content, question_number, r.id response_id, response_text, users_id
from chapters c
left join questions q
on c.id = q.chapters_id
left join response r
on q.id = r.questions_id"""))

for r in res:
    print(r, "\n")
