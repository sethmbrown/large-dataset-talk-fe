import { Embedding } from "../types";
import { formatNumber } from "../utils/table-utils";

export const RowAndNodeCounter = ({ data = [] }: { data: Embedding[] }) => {
  const nodesOnDom = formatNumber(document.querySelectorAll("td").length);

  return (
    <>
      <p>Rows of data - {formatNumber(data.length)}</p>
      <p>Table nodes painted to DOM - {nodesOnDom}</p>
    </>
  );
};
