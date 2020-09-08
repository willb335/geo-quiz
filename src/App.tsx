import React from 'react';

import CT from './CT';
import Quiz from './Quiz';
import './App.css';
import json from './CT.geo.json';

function App() {
  return (
    <React.Fragment>
      <Quiz />
      <CT data={json} />
    </React.Fragment>
  );
}

export default App;
