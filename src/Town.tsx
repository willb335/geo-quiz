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

const patterns: Pattern[] = ['wave', 'line', 'circle', 'line', 'wave'];
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
  const isSelected: boolean = selectedTowns.includes(index);

  useEffect((): void => {
    if (index === selectedTowns[finalSelection]) {
      findWikipedia(centroid);
    }
  }, [centroid, finalSelection, findWikipedia, index, selectedTowns]);

  const markerFill =
    selection && selectedTowns[finalSelection] === index
      ? '#228F67'
      : selection
      ? '#D93F4C'
      : 'white';

  const color =
    selection && selectedTowns[finalSelection] === index
      ? '#228F67'
      : selection && isSelected
      ? '#D93F4C'
      : '#0C2D83';

  const pattern: Pattern =
    patterns[Math.floor(Math.random() * patterns.length)];
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
        height={0.2}
        width={0.2}
        stroke="white"
        strokeWidth={0.005}
        background={color}
        orientation={[orientation]}
      />

      <PatternCircles
        id={`${index}-circle`}
        height={0.2}
        width={0.2}
        strokeWidth={0.009}
        background={color}
        stroke="white"
        radius={0.005}
      />

      <PatternWaves
        id={`${index}-wave`}
        height={0.2}
        width={0.2}
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
  const isSelected: boolean = nextProps.selectedTowns.includes(nextProps.index);

  if (prevProps.selectedTowns !== nextProps.selectedTowns) return false;

  if (prevProps.selection !== nextProps.selection && isSelected) return false;

  return true;
};

export default React.memo(Town, comparator);
