import React, { FunctionComponent, useRef, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Marker,
  Geography,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import styled from 'styled-components';
import Geonames from 'geonames.js';

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

const geonames = new Geonames({
  username: 'willb335',
  lan: 'en',
  encoding: 'JSON',
});
const width = 800;
const height = 600;

const CT: FunctionComponent<CTProps> = ({ data }) => {
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
              <Town geo={geo} key={geo.rsmKey} centroid={centroid} index={i} />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default CT;

const StyledMarker = styled(Marker)`
  z-index: 10;
`;
