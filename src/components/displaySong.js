/* eslint-disable linebreak-style */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';

function DisplayMusic({ args }) {
  if (args.has_artist_saved) {
    return (
      <div>
        <h1>Song Explorer</h1>
        <h2 id="song_name">{args.song_name}</h2>
        <h3 id="song_artist">{args.song_artist}</h3>
        <div>
          <img src={args.song_image_url} width={300} height={300} />
        </div>
        <div>
          <audio controls autoPlay name="media">
            <source src={args.preview_url} type="audio/mpeg" />
          </audio>
        </div>
        <a href={args.genius_url} target="_blank" rel="noreferrer"> Click here to see lyrics! </a>
      </div>
    );
  }
  return (
    <div>
      <h2>Looks like you don't have anything saved! Use the form below!</h2>
    </div>
  );
}

export default DisplayMusic;
