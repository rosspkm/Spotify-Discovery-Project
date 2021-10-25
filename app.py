from __init__ import app, bp, db, login_manager
import flask
from flask_login import login_user, current_user
from flask_login.utils import login_required
import os
import json
import random
import requests

from svr.models import User
from svr.genius import get_lyrics_link
from svr.spotify import get_access_token, get_song_data


MARKET = "US"
ARTIST_IDS = [
    "4UXqAaa6dQYAk18Lv7PEgX",  # FOB
    "3jOstUTkEu2JkjvRdBA5Gu",  # Weezer
    "7oPftvlwr6VrsViSDV7fJY",  # Green Day
]


@bp.route("/index")
@login_required
def index():

    return flask.render_template(
        "index.html",
    )


app.register_blueprint(bp)


@app.route("/load_data", methods=["POST"])
def load_data():
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
    DATA = {
        "has_artist_saved": has_artists_saved,
        "song_name": song_name,
        "song_artist": song_artist,
        "song_image_url": song_image_url,
        "preview_url": preview_url,
        "genius_url": genius_url,
        "artists": artist_ids,
    }
    return json.dumps(DATA)


@app.route("/")
def main():
    if current_user.is_authenticated:
        return flask.redirect(flask.url_for("bp.index"))
    return flask.redirect(flask.url_for("login"))


@app.route("/signup")
def signup():
    return flask.render_template("signup.html")


@app.route("/signup", methods=["POST"])
def signup_post():
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
    return flask.render_template("login.html")


@app.route("/login", methods=["POST"])
def login_post():
    username = flask.request.form.get("username")
    user = User.query.filter_by(username=username).first()
    if user:
        login_user(user)
        return flask.redirect(flask.url_for("bp.index"))

    else:
        return flask.jsonify({"status": 401, "reason": "Username or Password Error"})


@app.route("/save", methods=["POST"])
def save():

    artists = flask.request.json["artists"]

    for artist in artists:
        try:
            access_token = get_access_token()
            get_song_data(artist, access_token)
        except Exception:
            flask.flash("Invalid artist ID entered")
            return flask.Response(
                "Invalid artist", status=404, mimetype="application/json"
            )
    User.query.filter_by(username=current_user.username).update({"artists": artists})
    db.session.commit()
    return load_data()


def get_access_token():
    response = requests.post(
        "https://accounts.spotify.com/api/token",
        {
            "grant_type": "client_credentials",
            "client_id": os.getenv("CLIENT_ID"),
            "client_secret": os.getenv("CLIENT_SECRET"),
        },
    )
    return response.json()["access_token"]


@login_manager.user_loader
def load_user(user_name):
    return User.query.get(user_name)


app.run(host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8081)), debug=True)
