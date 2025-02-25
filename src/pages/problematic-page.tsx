import { useState, useEffect } from "react";
import { NonVirtualizedTable } from "../components/non-virtualized-table";
import { NonWebGlPlot } from "../components/non-webgl-plot";
import { Embedding } from "../types";

import { useCountStore } from "../store";

export const ProblematicPage = () => {
  const [embeddings, setEmbeddings] = useState<Embedding[]>([]);
  const count = useCountStore((s) => s.count);

  useEffect(() => {
    fetch("http://localhost:3000/api/embeddings")
      .then((data) => data.json())
      .then((data) => setEmbeddings(data as Embedding[]));
  }, []);

  const dataSubset = embeddings.slice(0, count);

  return (
    <>
      <NonWebGlPlot data={dataSubset} />
      <NonVirtualizedTable data={dataSubset} />
    </>
  );
};
