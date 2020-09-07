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
      const data = await geonames.countryInfo({ country: 'US' });
      const unitedStates = data.geonames[0];

      const countyData = await geonames.children({
        geonameId: 4831725,
      });

      const counties = countyData.geonames;

      // for (const county of counties) {
      //   const townData = await geonames.children({})
      // }

      console.log(unitedStates);
      console.log(counties);
    } catch (err) {
      console.error(err);
    }
  }

  return <div>Hello World</div>;
};

export default Quiz;
