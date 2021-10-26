/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayMusic from './components/displaySong';
import SaveMusic from './components/saveMusic';
import Popup from './components/popUp';
import Logout from './components/Logout';

function App() {
  const [args, setArgs] = useState({ artists: [] });
  const [err, setErr] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    axios.post('/load_data', {}).then(({ data }) => setArgs(data));
  }, []); // empty so this useEffect only works on app load instead of every rerender

  const handleArgs = (args) => {
    setArgs(args);
  };

  const handleErr = (err) => {
    setErr(err);
    setTimeout(() => setErr(''), 4000);
  };
  // TODO: Implement your main page as a React component.
  //   {% with messages = get_flashed_messages() %}
  //   {% if messages %}
  //     <ul class=flashes>
  //       {% for message in messages %}
  //         <li>{{ message }}</li>
  //       {% endfor %}
  //     </ul>
  //   {% endif %}
  // {% endwith %}
  return (
    <div>
      {err && !isOpen && (
        <Popup
          content={(
            <>
              <b>ERROR</b>
              <p>Invalid Artist ID</p>
              <button>Close Popup</button>
            </>
          )}
          handleClose={togglePopup}
        />
      )}
      <Logout />
      <DisplayMusic args={args} />
      <SaveMusic handleErr={handleErr} handleArgs={handleArgs} artists={args.artists} />
    </div>
  );
}

export default App;
