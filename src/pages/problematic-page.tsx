import { useState, useEffect } from "react";
import { NonVirtualizedTable } from "../components/non-virtualized-table";
import { NonWebGlPlot } from "../components/non-webgl-plot";
import { Embedding } from "../types";
import { VirtualizedTable } from "../components/virtualized-table";

export const ProblematicPage = () => {
  const [embeddings, setEmbeddings] = useState<Embedding[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/embeddings")
      .then((data) => data.json())
      .then((data) => setEmbeddings(data as Embedding[]));
  }, []);

  const dataSubset = embeddings.slice(0, 5000);

  return (
    <>
      {/* <NonWebGlPot data={dataSubset} /> */}
      <VirtualizedTable data={dataSubset} />
    </>
  );
};
