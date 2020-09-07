import React from 'react';

import CT from './CT';
import './App.css';
const json = require('./CT.geo.json');

function App() {
  return <CT data={json} />;
}

export default App;
