"""
Routes and main functionality of flask backend
"""
import os
import json
import random

import flask
from flask_login import login_user, current_user, login_required, logout_user

from __init__ import app, bp, db, login_manager
from svr.models import User
from svr.genius import get_lyrics_link
from svr.spotify import get_access_token, get_song_data, validate_artist


@bp.route("/index")
@login_required
def index():
    """
    Main index page function
    """
    return flask.render_template(
        "index.html",
    )


app.register_blueprint(bp)


@app.route("/load_data", methods=["POST"])
def load_data():
    """
    A route specifically for loading data
    """
    artist_ids = User.query.filter_by(username=current_user.username).first().artists
    has_artists_saved = len(artist_ids) > 0 or False
    if has_artists_saved:
        artist_id = random.choice(artist_ids)

        # API calls
        access_token = get_access_token()
        (song_name, song_artist, song_image_url, preview_url) = get_song_data(
            artist_id, access_token
        )
        genius_url = get_lyrics_link(song_name)

    else:
        (song_name, song_artist, song_image_url, preview_url, genius_url) = (
            None,
            None,
            None,
            None,
            None,
        )
    data = {
        "has_artist_saved": has_artists_saved,
        "song_name": song_name,
        "song_artist": song_artist,
        "song_image_url": song_image_url,
        "preview_url": preview_url,
        "genius_url": genius_url,
        "artists": artist_ids,
    }
    return json.dumps(data)


@app.route("/")
def main():
    """
    Main route when loading up the app
    """
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))
    return flask.redirect(flask.url_for("login"))


@app.route("/signup")
def signup():
    """
    Route for signup route
    """
    return flask.render_template("signup.html")


@app.route("/signup", methods=["POST"])
def signup_post():
    """
    Route for posting the signup username to backend
    """
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        pass
    else:
        user = User(username=username)
        db.session.add(user)
        db.session.commit()

    return flask.redirect(flask.url_for("login"))


@app.route("/login")
def login():
    """
    Route for loading the login page
    """
    return flask.render_template("login.html")


@app.route("/login", methods=["POST"])
def login_post():
    """
    Route for posting the data to the backend
    """
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        login_user(user)
        return flask.redirect(flask.url_for("bp.index"))

    else:
        return flask.jsonify({"status": 401, "reason": "Username or Password Error"})


@app.route("/save", methods=["POST"])
def save():
    """
    Route for saving the artists from the frontend to the backend
    """
    artists = flask.request.json["artists"]

    for artist in artists:
        try:
            access_token = get_access_token()
            validate_artist(artist, access_token)
        except LookupError:
            return flask.Response(
                "Invalid artist", status=404, mimetype="application/json"
            )
    User.query.filter_by(username=current_user.username).update({"artists": artists})
    db.session.commit()
    return load_data()


@app.route("/logout")
def logout():
    logout_user()
    return flask.redirect("/")


@login_manager.user_loader
def load_user(user_name):
    """
    Function for loading a user from the database
    """
    return User.query.get(user_name)


app.run(host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 4141)), debug=True)
