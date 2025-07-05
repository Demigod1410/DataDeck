"use client"

import * as React from "react"
import Link from "next/link"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Columns, FileDown, FileUp } from "lucide-react"
import Papa from "papaparse"

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme-toggle"
import type { User } from "@/data/mock-data"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends User, TValue>({
  columns,
  data: initialData,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = React.useState<TData[]>(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    department: false,
    location: false,
  })
  const [globalFilter, setGlobalFilter] = React.useState("")

  const { toast } = useToast()
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    try {
      const storedVisibility = localStorage.getItem("datatable-column-visibility")
      if (storedVisibility) {
        setColumnVisibility(JSON.parse(storedVisibility))
      }
    } catch (error) {
      console.error("Failed to parse column visibility from localStorage", error)
    }
  }, [])

  React.useEffect(() => {
    try {
      localStorage.setItem("datatable-column-visibility", JSON.stringify(columnVisibility))
    } catch (error) {
      console.error("Failed to save column visibility to localStorage", error)
    }
  }, [columnVisibility])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
        pagination: {
            pageSize: 10,
        }
    }
  })

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse<TData>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // Basic validation
          const requiredKeys: (keyof User)[] = ["id", "name", "email", "age", "role"];
          const firstData = results.data[0];
          if(firstData && requiredKeys.every(key => key in firstData)){
            setData(results.data as TData[])
            toast({
              title: "Success",
              description: "CSV data imported successfully.",
            })
          } else {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Invalid CSV format or missing required columns.",
            })
          }
        },
        error: (error) => {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Error parsing CSV: ${error.message}`,
          })
        },
      })
    }
  }

  const handleExport = () => {
    const visibleColumns = table.getVisibleLeafColumns().map(c => c.id);
    const csvData = table.getFilteredRowModel().rows.map((row) => {
        const filteredData: Partial<TData> = {};
        visibleColumns.forEach(colId => {
            if (colId in row.original) {
                filteredData[colId as keyof TData] = row.original[colId as keyof TData];
            }
        });
        return filteredData;
    });

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "table-data.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast({
      title: "Success",
      description: "Data exported to CSV.",
    })
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold">Dynamic Table Toolkit</h1>
        </Link>
        <div className="flex items-center gap-2">
           <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".csv"
          className="hidden"
        />
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <FileUp className="mr-2 h-4 w-4" />
          Import
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Columns className="mr-2 h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-card">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
