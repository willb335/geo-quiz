import React, { FunctionComponent, useEffect } from 'react';
import { Marker, Geography, Point } from 'react-simple-maps';
import { PatternLines, PatternWaves, PatternCircles } from '@vx/pattern';
import { PatternOrientationType } from '@vx/pattern/lib/constants';

interface TownProps {
  centroid: Point;
  geo: any;
  index: number;
  selectedTowns: number[];
  finalSelection: number;
  findWikipedia: Function;
  handleMarkerClick: Function;
  selection: number | undefined;
}

type Orientation = 'diagonal' | 'horizontal' | 'vertical';
type Pattern = 'wave' | 'line' | 'circle';

const patterns: Pattern[] = ['wave', 'line', 'circle'];
const orientations: Orientation[] = ['horizontal', 'vertical', 'diagonal'];

const Town: FunctionComponent<TownProps> = ({
  centroid,
  geo,
  index,
  selectedTowns,
  finalSelection,
  findWikipedia,
  handleMarkerClick,
  selection,
}) => {
  const isSelected = selectedTowns.includes(index);

  useEffect((): void => {
    if (index === selectedTowns[finalSelection]) {
      findWikipedia(centroid);
    }
  }, [
    centroid,
    finalSelection,
    findWikipedia,
    index,
    isSelected,
    selectedTowns,
  ]);

  const markerFill =
    selection && selectedTowns[finalSelection] === index
      ? '#228F67'
      : selection
      ? '#D93F4C'
      : 'white';

  const color =
    selection && selectedTowns[finalSelection] === index
      ? '#228F67'
      : selection && selectedTowns.includes(index)
      ? '#D93F4C'
      : '#0C2D83';

  const pattern: string = patterns[Math.floor(Math.random() * patterns.length)];
  const orientation: PatternOrientationType =
    orientations[Math.floor(Math.random() * orientations.length)];

  return (
    <React.Fragment key={geo.rsmKey}>
      <Geography
        geography={geo}
        fill={`url('#${index}-${pattern}')`}
        strokeWidth={0.005}
        stroke={'white'}
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
      <Marker
        coordinates={centroid}
        onClick={(e) => handleMarkerClick(e, selectedTowns, index)}
      >
        {isSelected && (
          <circle r={0.2} fill={markerFill} stroke="#fff" strokeWidth={0.003} />
        )}
      </Marker>
    </React.Fragment>
  );
};

const comparator = (prevProps: TownProps, nextProps: TownProps): boolean => {
  if (prevProps.selection !== nextProps.selection) {
    return false;
  }
  return true;
};

export default React.memo(Town, comparator);
