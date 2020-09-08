import React, { FunctionComponent, useState } from 'react';
import { ComposableMap, Geographies } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

import Town from './Town';

interface Feature {
  type: string;
  properties: {
    [key: string]: string;
  };
}

interface Data {
  type: string;
  features: Feature[];
}

interface CTProps {
  data: Data;
}

const width = 800;
const height = 600;
const SELECTED_TOWNS_LENGTH = 5;
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}
const selectedTowns: number[] = [];
while (selectedTowns.length < SELECTED_TOWNS_LENGTH) {
  const r = Math.floor(Math.random() * 168) + 1;
  if (selectedTowns.indexOf(r) === -1) selectedTowns.push(r);
}

const CT: FunctionComponent<CTProps> = ({ data }) => {
  const [finalSelection] = useState(getRandomInt(SELECTED_TOWNS_LENGTH));

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 820 }}
      width={width}
      height={height}
      viewBox="640 219 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Geographies geography={data.features}>
        {({ geographies }) =>
          geographies.map((geo, i) => {
            const centroid = geoCentroid(geo);

            return (
              <Town
                geo={geo}
                key={geo.rsmKey}
                centroid={centroid}
                index={i}
                selectedTowns={selectedTowns}
                finalSelection={finalSelection}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default CT;
