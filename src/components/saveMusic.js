/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistList from './lib/ArtistList';

function SaveMusic({ artists, handleArgs, handleErr }) {
  const [artistlst, setArtists] = useState(artists || []);
  const [artist, setArtist] = useState('');

  const LOCAL_STORAGE_KEY = ':)';

  useEffect(() => {
    const storedArtists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedArtists) setArtists(storedArtists);
  }, []);

  useEffect(() => {
    setArtists(artists);
  }, [artists]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(artistlst));
  }, [artistlst]);

  function handleAddArtist() {
    setArtists([...artists, artist]);
  }

  function delArtist(id) {
    setArtists(artistlst.filter((artist) => artist !== id));
  }

  async function sendData(body) {
    try {
      const res = await axios.post('/save', { artists: body });
      handleArgs(res.data);
      return res.data;
    } catch (err) {
      handleErr('Invalid Artist ID');
    }
    return ('');
  }

  return (
    <div>
      <input type="text" value={artist} onInput={(e) => setArtist(e.target.value)} />
      <button onClick={handleAddArtist}>Add Artist</button>
      <ArtistList artists={artistlst} delArtist={delArtist} />
      <br />
      <button
        onClick={() => {
          sendData(artistlst);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default SaveMusic;
