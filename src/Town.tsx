import React, {
  FunctionComponent,
  useState,
  useEffect,
  SyntheticEvent,
} from 'react';
import { Marker, Geography, Point, Annotation } from 'react-simple-maps';
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

  function handleMarkerClick(e: SyntheticEvent): void {
    e.preventDefault();
    if (selectedTowns.includes(index)) {
      setMarkerSelection(true);
    }
  }

  const markerFill = () =>
    markerSelected && selectedTowns[finalSelection] === index
      ? 'green'
      : markerSelected
      ? 'red'
      : 'white';

  return (
    <React.Fragment key={geo.rsmKey}>
      <Geography
        geography={geo}
        fill={townFill}
        strokeWidth={0.01}
        style={{
          default: { outline: 'none' },
          hover: { outline: 'none' },
          pressed: { outline: 'none' },
        }}
        tabIndex={-1}
      />
      <Marker coordinates={centroid} onClick={(e) => handleMarkerClick(e)}>
        {isSelected && (
          <circle
            r={0.15}
            fill={markerFill()}
            stroke="black"
            strokeWidth={0.003}
          />
        )}
      </Marker>
      {/* {selectedTowns.includes(index) && (
       
      )} */}
    </React.Fragment>
  );
};

export default Town;
