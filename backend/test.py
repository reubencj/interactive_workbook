
import email
from flask_app.models.user import User
from flask import jsonify
from flask_app.models.workbook import Workbook



workbook_data = {
    "name": "test 5",
    "description": "Some description of the workbook",
    "number_of_chapters": 12,
    "author_id": 1, 
}

# reuben = User.get_user_by_email('reuen@gmail.com')

# print(reuben)

print(Workbook.get_all_workbooks())
# password : 12345678a