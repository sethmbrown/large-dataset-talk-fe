import DeckGL, {
  LineLayer,
  MapViewState,
  ScatterplotLayer,
  TextLayer,
} from "deck.gl";
import { Embedding } from "../types";
import { CHART_HEIGHT } from "../constants";
import { memo, useMemo } from "react";

const INITIAL_VIEW_STATE: MapViewState = {
  latitude: 0,
  longitude: 0,
  zoom: 4,
  pitch: 0,
  bearing: 0,
  minZoom: 4,
};

const MAX = 10;

// Gridlines Data
const createGridLines = (min: number, max: number, step: number) => {
  const lines = [];
  for (let i = min; i <= max; i += step) {
    lines.push({ sourcePosition: [i, min], targetPosition: [i, max] }); // Vertical
    lines.push({ sourcePosition: [min, i], targetPosition: [max, i] }); // Horizontal
  }
  return lines;
};

// Axis Labels
const createAxisLabels = (min: number, max: number, step: number) => {
  const labels = [];
  const offset = MAX + 1;
  for (let i = min; i <= max; i += step) {
    labels.push({ position: [i, -offset], text: `${i}` }); // X-axis
    labels.push({ position: [-offset, i], text: `${i}` }); // Y-axis
  }
  return labels;
};

const gridLineLayer = new LineLayer({
  id: "grid-line-layer",
  data: createGridLines(-MAX, MAX, 1),
  getSourcePosition: (d) => d.sourcePosition,
  getTargetPosition: (d) => d.targetPosition,
  getColor: [200, 200, 200],
  getWidth: 1,
});

const axisLabelLayer = new TextLayer({
  id: "axis-label-layer",
  data: createAxisLabels(-MAX, MAX, 1),
  getPosition: (d) => d.position,
  getText: (d) => d.text,
  getColor: [0, 0, 0],
  getSize: 16,
  getTextAnchor: "middle",
  getAlignmentBaseline: "center",
});

export const WebGlPlot = memo(({ data = [] }: { data: Embedding[] }) => {
  const mappedData = useMemo(() => {
    return data.map((v) => ({
      position: [v.x, v.y, v.z],
    }));
  }, [data.length]);

  const scatterPlotLayer = new ScatterplotLayer({
    id: "scatterplot-layer",
    data: mappedData,
    getPosition: (d) => d.position,
    getFillColor: (d) => d.color,
    getRadius: 100,
    radiusScale: 30,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
  });

  return (
    <div
      style={{
        position: "relative",
        height: CHART_HEIGHT,
        width: "100%",
      }}
    >
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        layers={[scatterPlotLayer, gridLineLayer, axisLabelLayer]}
        controller={{ scrollZoom: true, dragPan: true }}
      />
    </div>
  );
});
