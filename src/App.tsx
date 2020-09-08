import React, { useState, useEffect } from 'react';
import Geonames from 'geonames.js';
import { Point } from 'react-simple-maps';

import CT from './CT';
import Quiz from './Quiz';

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

function App() {
  const [currentWiki, setCurrentWiki] = useState('');
  useEffect(() => {
    console.log('currentWiki', currentWiki);
  }, [currentWiki]);
  async function findWikipedia(centroid: Point): Promise<string> {
    const wiki = await geonames.findNearbyWikipedia({
      lat: centroid[1],
      lng: centroid[0],
    });
    setCurrentWiki(wiki.geonames[0].summary);
    return wiki;
  }
  return (
    <React.Fragment>
      <div style={{ color: '#fff' }}>{currentWiki}</div>
      {/* <Quiz currentWiki={currentWiki} /> */}
      <CT findWikipedia={findWikipedia} />
    </React.Fragment>
  );
}

export default App;
