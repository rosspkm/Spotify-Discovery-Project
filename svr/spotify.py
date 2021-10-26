import json
import os
import requests
import base64
import random


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


def get_song_data(artist_id, access_token):
    response = requests.get(
        f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks",
        headers={"Authorization": f"Bearer {access_token}"},
        params={"market": "US"},
    )
    json_response = response.json()
    track_json = random.choice(json_response["tracks"])  # choose random track
    song_name = track_json["name"]
    song_artist = ", ".join([artist["name"] for artist in track_json["artists"]])
    song_image_url = track_json["album"]["images"][0]["url"]
    preview_url = track_json["preview_url"]
    return (song_name, song_artist, song_image_url, preview_url)


def validate_artist(artist_id, access_token):
    response = requests.get(
        f"https://api.spotify.com/v1/artists/{artist_id}",
        headers={"Authorization": f"Bearer {access_token}"},
        params={"market": "US"},
    )
    return response.json()["name"]
