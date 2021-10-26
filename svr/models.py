"""
Class for creating the database structure
"""
from flask_login import UserMixin
from __init__ import db


class User(UserMixin, db.Model):
    """
    User database model
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    artists = db.Column(db.PickleType)

    def __repr__(self):
        return f"<User {self.username}>"

    def get_username(self):
        """
        Function for getting the username
        """
        return self.username


db.create_all()
