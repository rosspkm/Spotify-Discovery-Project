import './App.css';
import Display_Music from './components/displaySong';
import Save_Music from './components/saveMusic';
import React from 'react';

function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  const args = JSON.parse(document.getElementById("data").text);


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
