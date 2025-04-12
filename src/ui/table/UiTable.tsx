import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import UiTextInputBase from '../inputs/UiTextInputBase';
import { TableCell, TableRow } from './components';

type UiTableBaseProps = {
  deleteEntries?: (ids: number[]) => void;
  dataSet: any;
  columnsSchema: ColumnDef<any>[];
  searchPlaceHolder?: string;
  maxHeightClassName?: string;
  actionButtonComponent?: React.ReactNode;
};
const UiTable = ({
  dataSet,
  columnsSchema,
  searchPlaceHolder = 'Type to search...',
  maxHeightClassName = 'max-h-[calc(100vh-340px)]',
  actionButtonComponent,
}: UiTableBaseProps) => {
  //   STATE/s
  const [filterState, setFilterState] = useState('');

  // VARIABLES
  const tableData = useMemo(() => dataSet ?? [], [dataSet]);

  const tableMetaData = dataSet?.data?.meta || {};

  const table = useReactTable({
    data: tableData,
    columns: columnsSchema,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filterState.trim(),
    },
    onGlobalFilterChange: setFilterState,
  });

  // HANDLER/s
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState(event.target.value);
  };

  useEffect(() => {
    if (!tableMetaData) {
      return () => {};
    }
  }, [dataSet?.data?.meta, dataSet?.isLoading]);

  return (
    <div className='flex flex-col'>
      <section className='flex items-center justify-between py-2 '>
        <div className='flex items-center gap-4'>
          <section className='w-56'>
            <UiTextInputBase
              type='text'
              value={filterState}
              onChange={handleChange}
              placeholder={searchPlaceHolder}
              className='h-8 w-full  pl-2 ring-1 ring-extraLightGray border-none text-sm text-body'
              icon={
                <>
                  {filterState ? (
                    <button
                      type='button'
                      className='flex items-center rounded justify-center bg-primary/10 text-primary p-0.5'
                      onClick={() => {
                        setFilterState('');
                      }}>
                      <X className='size-4' />
                    </button>
                  ) : (
                    <Search className='size-4' />
                  )}
                </>
              }
            />
          </section>
        </div>

        <div className='flex items-center self-end gap-2'>
          {actionButtonComponent || <></>}
        </div>
      </section>

      <div
        id='hide-scrollbar'
        className={`flex flex-col rounded border border-extraLightGray overflow-y-auto overflow-x-auto ${maxHeightClassName} 
           
        `}>
        <table className='w-full'>
          <thead className='h-10'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow type='head' key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      type='th'
                      key={header.id}
                      dataColumnId={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </thead>

          {table.getRowModel().rows.length === 0 ? (
            <tbody>
              <tr className='text-body '>
                <td
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  className='h-10 rounded'>
                  <div className='flex items-center justify-center h-full'>
                    <p className='font-medium text-sm'>
                      No data available to show!
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row?.index}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        type='td'
                        key={cell.id}
                        dataColumnId={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className='flex justify-between items-center mt-4'>
        <div className='text-sm text-gray-600'>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>

        <div className='flex gap-2'>
          <button
            className='px-3 py-1 text-sm border rounded disabled:opacity-50'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <button
            className='px-3 py-1 text-sm border rounded disabled:opacity-50'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UiTable;
