import React, { FunctionComponent, useState } from 'react';
import { ComposableMap, Geographies, Annotation } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';

import Town from './Town';
import json from './CT.geo.json';

interface CTProps {
  findWikipedia: Function;
  handleMarkerClick: Function;
  selection: number | undefined;
  selectedTowns: number[];
  finalSelection: number;
}

const width = 800;
const height = 600;

const CT: FunctionComponent<CTProps> = ({
  findWikipedia,
  handleMarkerClick,
  selection,
  selectedTowns,
  finalSelection,
}) => {
  // const [finalSelection] = useState(getRandomInt(SELECTED_TOWNS_LENGTH));

  return (
    <ComposableMap
      projection="geoAlbersUsa"
      projectionConfig={{ scale: 820 }}
      width={width}
      height={height}
      viewBox="634 219 35 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Geographies geography={json.features}>
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
                findWikipedia={findWikipedia}
                handleMarkerClick={handleMarkerClick}
                selection={selection}
              />
            );
          })
        }
      </Geographies>
      {selection && (
        <Geographies geography={json.features}>
          {({ geographies }) =>
            geographies.map((geo, i) => {
              const centroid = geoCentroid(geo);
              return (
                selectedTowns.includes(i) && (
                  <Annotation
                    key={geo.rsmKey}
                    subject={centroid}
                    dx={-1}
                    dy={-0.3}
                    connectorProps={{
                      stroke: '#fff',
                      strokeWidth: 0.02,
                      strokeLinecap: 'round',
                    }}
                  >
                    <text
                      y={-0.11}
                      fontSize={0.3}
                      textAnchor="middle"
                      style={{ fill: '#fff' }}
                      onClick={() => console.log(geo.properties.town)}
                    >
                      {geo.properties.town}
                    </text>
                  </Annotation>
                )
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default CT;
