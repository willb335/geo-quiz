import React, { FunctionComponent, useState, useEffect } from 'react';
import { Marker, Geography, Point } from 'react-simple-maps';
import styled from 'styled-components';
import Geonames from 'geonames.js';

interface TownProps {
  centroid: Point;
  geo: any;
  index: number;
  selectedTowns: number[];
  finalSelection: number;
}

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Town: FunctionComponent<TownProps> = ({
  centroid,
  geo,
  index,
  selectedTowns,
  finalSelection,
}) => {
  const [markerSelected, setMarkerSelection] = useState(false);
  const [townFill] = useState(getRandomColor());
  const isSelected = selectedTowns.includes(index);

  useEffect((): void => {
    async function findWikipedia() {
      const wiki = await geonames.findNearbyWikipedia({
        lat: centroid[1],
        lng: centroid[0],
      });
      console.log('wiki', wiki);
    }

    if (index === selectedTowns[finalSelection]) {
      findWikipedia();
    }
  }, [centroid, finalSelection, index, isSelected, selectedTowns]);

  function handleMarkerClick(): void {
    if (selectedTowns.includes(index)) {
      setMarkerSelection(true);
    }
  }

  return (
    <React.Fragment key={geo.rsmKey}>
      <Geography geography={geo} fill={townFill} strokeWidth={0.01} />
      <Marker coordinates={centroid} onClick={handleMarkerClick}>
        {isSelected && (
          <circle
            r={0.15}
            fill={markerSelected ? 'red' : 'white'}
            stroke="black"
            strokeWidth={0.003}
          />
        )}

        {/* <text
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
        </text> */}
      </Marker>
    </React.Fragment>
  );
};

export default Town;

const StyledMarker = styled(Marker)`
  z-index: 10;
`;
