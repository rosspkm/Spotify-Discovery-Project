import './App.css';
import Display_Music from './components/displaySong';
import Save_Music from './components/saveMusic';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [args, setArgs] = useState({ artists: [] });
  const [err, setErr] = useState("");

  useEffect(() => {
    axios.post("/load_data", {}).then(({ data }) => setArgs(data));
  }, []) // empty so this useEffect only works on app load instead of every rerender

  const handleArgs = (args) => {
    setArgs(args);
  }

  const handleErr = (err) => {
    setErr(err);
    setTimeout(() => setErr(""), 4000);
  }
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
      {err && <div>{err}</div>}
      <Display_Music args={args} />
      <Save_Music handleErr={handleErr} handleArgs={handleArgs} artists={args.artists} />
    </div>
  )
}

export default App;
