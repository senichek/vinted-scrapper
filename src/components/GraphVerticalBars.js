import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisBottom } from '@visx/axis';

const GraphVerticalBars =  ({brandsData}) => {
// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 30, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = d => d.title + " - " + d.pretty_favourite_count;
const y = d => +d.favourite_count * 100;

// And then scale the graph by our data
const xScale = scaleBand({
  range: [0, xMax],
  round: true,
  domain: brandsData.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...brandsData.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => data => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

  return (
    <svg width={width} height={height}>
      {brandsData.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <>
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth() + 5}
              fill="#fc2e1c"
            />
          </Group>
          <AxisBottom
          top={yMax + margin.top - 45}
          scale={xScale}
          stroke={"white"}
          tickStroke={"white"}
          numTicks={brandsData.length}
          tickLabelProps={{
            fill: "white",
            fontSize: 11,
            textAnchor: 'end',
            angle: 90,
          }}
          hideTicks={true}
          hideAxisLine={true}
          left={-2}
        />
          </>
        );
      })}
    </svg>
  );
}

export default GraphVerticalBars;