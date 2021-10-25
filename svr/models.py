from __init__ import db
from flask_login import UserMixin


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    artists = db.Column(db.PickleType)

    def __repr__(self):
        return f"<User {self.username}>"

    def get_username(self):
        return self.username


db.create_all()
