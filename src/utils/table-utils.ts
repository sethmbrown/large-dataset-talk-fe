import { createColumnHelper } from "@tanstack/react-table";
import { Embedding } from "../types";

const columnHelper = createColumnHelper<Embedding>();

export const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("x", {
    cell: (info) => info.getValue().toFixed(3),
  }),
  columnHelper.accessor("y", {
    cell: (info) => info.getValue().toFixed(3),
  }),
  columnHelper.accessor("z", {
    cell: (info) => info.getValue().toFixed(3),
  }),
];

export const formatNumber = (num?: number) => {
  if (!num) {
    return;
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    unitDisplay: "narrow",
  }).format(num);
};
