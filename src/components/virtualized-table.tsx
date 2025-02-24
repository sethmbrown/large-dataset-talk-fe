import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  Table,
  Row,
  flexRender,
} from "@tanstack/react-table";
import { Embedding } from "../types";
import { columns, formatNumber } from "../utils/table-utils";
import { useRef } from "react";
import {
  useVirtualizer,
  VirtualItem,
  Virtualizer,
} from "@tanstack/react-virtual";
import { Table as MantineTable } from "@mantine/core";

export const VirtualizedTable = ({ data = [] }: { data: Embedding[] }) => {
  // The virtualizer will need a reference to the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const nodesOnDom = formatNumber(document.querySelectorAll("td").length);

  return (
    <>
      <p>Non Virtualized Table</p>
      <p>Table nodes painted to DOM - {nodesOnDom}</p>
      <div
        className="container"
        ref={tableContainerRef}
        style={{
          overflow: "auto", //our scrollable table container
          position: "relative", //needed for sticky header
          height: "600px", //should be a fixed height
        }}
      >
        {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
        <MantineTable
          style={{ display: "grid" }}
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
        >
          <MantineTable.Thead
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "white",
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <MantineTable.Tr
                key={headerGroup.id}
                style={{ display: "flex", width: "100%" }}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <MantineTable.Th
                      key={header.id}
                      style={{
                        display: "flex",
                        width: header.getSize(),
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </MantineTable.Th>
                  );
                })}
              </MantineTable.Tr>
            ))}
          </MantineTable.Thead>
          <TableBody table={table} tableContainerRef={tableContainerRef} />
        </MantineTable>
      </div>
    </>
  );
};

interface TableBodyProps {
  table: Table<Embedding>;
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
}

function TableBody({ table, tableContainerRef }: TableBodyProps) {
  const { rows } = table.getRowModel();

  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <MantineTable.Tbody
      style={{
        display: "grid",
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
        position: "relative", //needed for absolute positioning of rows
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<Embedding>;
        return (
          <TableBodyRow
            key={row.id}
            row={row}
            virtualRow={virtualRow}
            rowVirtualizer={rowVirtualizer}
          />
        );
      })}
    </MantineTable.Tbody>
  );
}

interface TableBodyRowProps {
  row: Row<Embedding>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

function TableBodyRow({ row, virtualRow, rowVirtualizer }: TableBodyRowProps) {
  return (
    <MantineTable.Tr
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
      key={row.id}
      style={{
        display: "flex",
        position: "absolute",
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
        width: "100%",
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <MantineTable.Td
            key={cell.id}
            style={{
              display: "flex",
              width: cell.column.getSize(),
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </MantineTable.Td>
        );
      })}
    </MantineTable.Tr>
  );
}
