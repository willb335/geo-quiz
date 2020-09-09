import React, { useState, useEffect, FunctionComponent } from 'react';
import Geonames from 'geonames.js';
import { Point } from 'react-simple-maps';

import CT from './CT';
// import Quiz from './Quiz';

interface CurrentWiki {
  countryCode: string;
  distance: number;
  elevation: number;
  geoNameId: number;
  lang: number;
  lat: number;
  rank: number;
  summary: string;
  title: string;
  wikipediaUrl: string;
}

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

const App: FunctionComponent = () => {
  const [currentWikis, setCurrentWikis] = useState<CurrentWiki[] | undefined>(
    undefined
  );
  useEffect(() => {
    console.log('currentWiki', currentWikis);
  }, [currentWikis]);
  async function findWikipedia(centroid: Point): Promise<undefined | string> {
    try {
      if (currentWikis === undefined) {
        const wiki: {
          [geonames: string]: CurrentWiki[];
        } = await geonames.findNearbyWikipedia({
          lat: centroid[1],
          lng: centroid[0],
        });

        setCurrentWikis(wiki.geonames);
      }

      return;
    } catch (e) {
      console.log('error finding wikipedia', e);
      return e;
    }
  }
  return (
    <React.Fragment>
      {/* <div style={{ color: '#fff' }}>{currentWiki}</div> */}
      {/* <Quiz currentWiki={currentWiki} /> */}
      <CT findWikipedia={findWikipedia} />
    </React.Fragment>
  );
};

export default React.memo(App);
