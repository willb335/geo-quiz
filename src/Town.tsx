import React, { FunctionComponent, useState, useEffect } from 'react';
import { Marker, Geography, Point } from 'react-simple-maps';
import styled from 'styled-components';
import Geonames from 'geonames.js';

interface TownProps {
  centroid: Point;
  geo: any;
  index: number;
  selectedTowns: number[];
}

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

const Town: FunctionComponent<TownProps> = ({
  centroid,
  geo,
  index,
  selectedTowns,
}) => {
  useEffect(() => {
    const isSelected = selectedTowns.find((town) => town === index);
    async function findWikipedia() {
      const wiki = await geonames.findNearbyWikipedia({
        lat: centroid[1],
        lng: centroid[0],
      });
      console.log('wiki', wiki);
    }

    if (isSelected) {
      findWikipedia();
    }
  }, [centroid, index, selectedTowns]);

  return (
    <React.Fragment key={geo.rsmKey}>
      <Geography geography={geo} fill={`black`} strokeWidth={0.003} />
      <StyledMarker coordinates={centroid}>
        <text
          fontSize={0.25}
          textAnchor="middle"
          style={{
            zIndex: 5,
            position: 'absolute',
            fill: 'white',
          }}
          onClick={() => console.log(geo.properties.town)}
        >
          {geo.properties.town}
        </text>
      </StyledMarker>
    </React.Fragment>
  );
};

export default Town;

const StyledMarker = styled(Marker)`
  z-index: 10;
`;
