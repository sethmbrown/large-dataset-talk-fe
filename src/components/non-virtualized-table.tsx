import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Embedding } from "../types";
import { Table, Tooltip } from "@mantine/core";
import { columns } from "../utils/table-utils";
import { RowAndNodeCounter } from "./row-and-node-counter";
import { TABLE_HEIGHT } from "../constants";

export const NonVirtualizedTable = ({ data = [] }: { data: Embedding[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <p>Non Virtualized Table</p>
      <RowAndNodeCounter data={data} />
      <div
        style={{
          maxHeight: TABLE_HEIGHT,
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
                  <Tooltip
                    key={cell.id}
                    label={(cell.getValue() as number).toFixed(3)}
                  >
                    <Table.Td>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Td>
                  </Tooltip>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
};
