import React, { useEffect } from 'react';
import Geonames from 'geonames.js';

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

const Quiz = () => {
  useEffect(() => {
    getCities();
  }, []);

  async function getCities() {
    try {
      const countries = await geonames.countryInfo({});
      const states = await geonames.children({
        geonameId: countries.geonames[232].geonameId,
      });
      const regions = await geonames.children({
        geonameId: states.geonames[0].geonameId,
      });
      const cities = await geonames.children({
        geonameId: regions.geonames[0].geonameId,
      });
      console.log(states);
    } catch (err) {
      console.error(err);
    }
  }

  return <div>Hello World</div>;
};

export default Quiz;
