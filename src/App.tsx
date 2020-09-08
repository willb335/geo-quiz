import React, { useState } from 'react';
import Geonames from 'geonames.js';
import { Point } from 'react-simple-maps';

import CT from './CT';
import Quiz from './Quiz';

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

const App = React.memo(function () {
  const [currentWiki, setCurrentWiki] = useState('');
  async function findWikipedia(centroid: Point): Promise<string> {
    const wiki = await geonames.findNearbyWikipedia({
      lat: centroid[1],
      lng: centroid[0],
    });
    // setCurrentWiki(wiki);
    console.log('currentWiki', currentWiki);
    return wiki;
  }
  return (
    <React.Fragment>
      <Quiz />
      <CT findWikipedia={findWikipedia} />
    </React.Fragment>
  );
});

export default App;
