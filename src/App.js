import './App.css';
import Display_Music from './components/displaySong';
import Save_Music from './components/saveMusic';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [args, setArgs] = useState({ artists: [] });
  useEffect(() => {
    axios.get("/index").then(({ data }) => setArgs(data));
  }, []) // empty so this useEffect only works on app load instead of every rerender


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
  console.log("in the app.js")
  return (
    <div>
      <h1>TEST</h1>
      <Display_Music args={args} />
      <Save_Music artists={args.artists} />
    </div>
  )
}

export default App;
