import { useState, useEffect } from "react";
import { VirtualizedTable } from "../components/virtualized-table";
import { Embedding } from "../types";

export const ImprovedPage = () => {
  // TODO: Update to Tanstack Query
  const [embeddings, setEmbeddings] = useState<Embedding[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/embeddings")
      .then((data) => data.json())
      .then((data) => setEmbeddings(data as Embedding[]));
  }, []);

  const dataSubset = embeddings.slice(0, 1000);

  return (
    <>
      <VirtualizedTable data={dataSubset} />
    </>
  );
};
