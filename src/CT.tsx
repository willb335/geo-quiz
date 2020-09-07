import React, { FunctionComponent } from 'react';
import {
  ComposableMap,
  Geographies,
  Marker,
  Geography,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import styled from 'styled-components';

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
          geographies.map((geo) => {
            const centroid = geoCentroid(geo);

            return (
              <React.Fragment key={geo.rsmKey}>
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={`black`}
                  strokeWidth={0.003}
                />
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
