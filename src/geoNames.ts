import Geonames from 'geonames.js';

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

try {
  const countries = await geonames.countryInfo({}); //get continents
  const states = await geonames.children({
    geonameId: countries.geonames[0].geonameId,
  });
  const regions = await geonames.children({
    geonameId: states.geonames[0].geonameId,
  });
  const cities = await geonames.children({
    geonameId: regions.geonames[0].geonameId,
  });
  console.log(cities.geonames);
} catch (err) {
  console.error(err);
}
