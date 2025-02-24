import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Embedding } from "../types";
import { Table } from "@mantine/core";
import { columns, formatNumber } from "../utils/table-utils";

export const NonVirtualizedTable = ({ data = [] }: { data: Embedding[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const nodesOnDom = formatNumber(document.querySelectorAll("td").length);

  return (
    <>
      <p>Non Virtualized Table</p>
      <p>Table nodes painted to DOM - {nodesOnDom}</p>
      <div
        style={{
          maxHeight: "600px",
          overflow: "scroll",
        }}
      >
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
};
