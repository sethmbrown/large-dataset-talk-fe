import Plot from "react-plotly.js";
import { Embedding } from "../types";
import { CHART_HEIGHT } from "../constants";

export const NonWebGlPlot = ({ data = [] }: { data: Embedding[] }) => {
  return (
    <Plot
      data={[
        {
          x: data.map((point) => point.x),
          y: data.map((point) => point.y),
          mode: "markers",
          type: "scatter",
          marker: { color: "#007bff", size: 8 },
        },
      ]}
      layout={{
        title: "Zoomable & Pannable Scatterplot",
        xaxis: { title: "X Axis" },
        yaxis: { title: "Y Axis" },
        dragmode: "pan", // Default drag mode (use 'zoom' for zooming)
        autosize: true,
        height: CHART_HEIGHT,
        showlegend: false,
      }}
      config={{
        scrollZoom: true, // Enable mouse wheel zoom
        displayModeBar: true, // Show toolbar with zoom/pan/reset
        responsive: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
};
