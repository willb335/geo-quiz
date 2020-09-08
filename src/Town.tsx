import React, {
  FunctionComponent,
  useState,
  useEffect,
  SyntheticEvent,
} from 'react';
import { Marker, Geography, Point } from 'react-simple-maps';
import Geonames from 'geonames.js';
import { PatternLines, PatternWaves, PatternCircles } from '@vx/pattern';
import { PatternOrientationType } from '@vx/pattern/lib/constants';

interface TownProps {
  centroid: Point;
  geo: any;
  index: number;
  selectedTowns: number[];
  finalSelection: number;
}

type Orientation = 'diagonal' | 'horizontal' | 'vertical';

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});

const patterns = ['wave', 'line', 'circle'];
const orientations: Orientation[] = ['horizontal', 'vertical', 'diagonal'];
const color = '#0C2D83';

const Town: FunctionComponent<TownProps> = ({
  centroid,
  geo,
  index,
  selectedTowns,
  finalSelection,
}) => {
  const [markerSelected, setMarkerSelection] = useState(false);
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

  const pattern = patterns[Math.floor(Math.random() * patterns.length)];
  const orientation: PatternOrientationType =
    orientations[Math.floor(Math.random() * orientations.length)];

  return (
    <React.Fragment key={geo.rsmKey}>
      <Geography
        geography={geo}
        fill={`url('#${index}-${pattern}')`}
        strokeWidth={0.01}
        style={{
          default: { outline: 'none' },
          hover: { outline: 'none' },
          pressed: { outline: 'none' },
        }}
        tabIndex={-1}
      />
      <PatternLines
        id={`${index}-line`}
        height={0.05}
        width={0.05}
        stroke="white"
        strokeWidth={0.005}
        background={color}
        orientation={[orientation]}
      />

      <PatternCircles
        id={`${index}-circle`}
        height={0.05}
        width={0.05}
        strokeWidth={0.005}
        background={color}
        radius={0.005}
      />

      <PatternWaves
        id={`${index}-wave`}
        height={0.05}
        width={0.05}
        stroke="white"
        strokeWidth={0.005}
        background={color}
      />
      <Marker coordinates={centroid} onClick={(e) => handleMarkerClick(e)}>
        {isSelected && (
          <circle
            r={0.15}
            fill={markerFill()}
            stroke="#fff"
            strokeWidth={0.003}
          />
        )}
      </Marker>
    </React.Fragment>
  );
};

export default Town;
