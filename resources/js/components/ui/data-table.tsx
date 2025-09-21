"use client"

import {
  ColumnDef,
  FilterFnOption,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./button"
import { Input } from "./input"
import React from "react"

function normalizeString(value: string, whiteSpaceReplace = "-") {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, whiteSpaceReplace)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  pageSize?: number
  searchFields?: string[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 5,
  searchFields = []
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
    filterFns: {
      fuzzy: (row, _, value) => {
        const data = row.original
        const search = normalizeString(value as string)
        return searchFields.some((field) => normalizeString(data[field].toString()).includes(search))
      }
    },
    globalFilterFn: 'fuzzy' as FilterFnOption<TData>,
     state: {
      globalFilter,
    },
    initialState: { pagination: { pageSize: pageSize } },
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex items-center py-4 mx-4">
        <Input
          placeholder="Pesquisar..."
          value={globalFilter}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="ml-4">
          <span className="text-sm text-muted-foreground">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()} - Total de {table.getFilteredRowModel().rows.length} registros gerais
          </span>

        </div>
        <div className="mr-4">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Próximo
          </Button>
        </div>
    </div>
    </div>
  )
}