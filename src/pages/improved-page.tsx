import { useState, useEffect } from "react";
import { VirtualizedTable } from "../components/virtualized-table";
import { Embedding } from "../types";
import { WebGlPlot } from "../components/webgl-plot";
import { useCountStore } from "../store";

export const ImprovedPage = () => {
  // TODO: Update to Tanstack Query
  const [embeddings, setEmbeddings] = useState<Embedding[]>([]);
  const dataCount = useCountStore((s) => s.count);

  useEffect(() => {
    fetch("http://localhost:3000/api/embeddings")
      .then((data) => data.json())
      .then((data) => setEmbeddings(data as Embedding[]));
  }, []);

  const dataSubset = embeddings.slice(0, dataCount);

  return (
    <>
      <WebGlPlot data={dataSubset} />
      <VirtualizedTable data={dataSubset} />
    </>
  );
};
