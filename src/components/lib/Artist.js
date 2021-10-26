/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';

export default function Artist({ artist, delArtist }) {
  return (
    <div>
      <label>{artist}</label>
      <button onClick={() => delArtist(artist)}>delete artist</button>
    </div>
  );
}
