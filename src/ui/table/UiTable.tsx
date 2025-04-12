import {
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
} from 'lucide-react';
import UiButton from '../UiButton';
import UiTextInputBase from '../inputs/UiTextInputBase';
import { TableCell, TableRow } from './components';
// import FilterTableDropdown from './components/FilterTableDropdown';
// import MultipleDeleteChip from './components/MultipleDeleteChip';
// import ToggleColumnDropdown from './components/ToggleColumnsDropdown';
// import { UiTableBaseProps } from './table.types';

type UiTableBaseProps = {
  deleteEntries?: (ids: number[]) => void;
  dataSet: any;
  columnsSchema: ColumnDef<any>[];
  query?: string;
  validateSearchInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setQuery?: (arg: string) => void;
  searchPlaceHolder?: string;
  maxHeightClassName?: string;
  maxWidthClassName?: string;
  actionButtonComponent?: React.ReactNode;
  filterType?: string;
  filterDropownOptions?: {
    id: number;
    name: string;
    filterBy: string;
    filterKey: string;
  }[];
};
const UiTable = ({
  dataSet,
  columnsSchema,
  query,
  setQuery,
  validateSearchInput,
  searchPlaceHolder = 'Type to search...',
  maxHeightClassName = 'max-h-[calc(100vh-340px)]',
  actionButtonComponent,
}: UiTableBaseProps) => {
  //   STATE/s
  const [columnVisibility, setColumnVisibility] = useState({});
  // const [zoomTable, setZoomTable] = useState(false);
  const [filterState, setFilterState] = useState('');
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

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
      columnVisibility: columnVisibility,
      globalFilter: filterState.trim(),
      columnOrder,
    },
    initialState: { columnPinning: { left: ['id'] } },
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setFilterState,
    onColumnVisibilityChange: setColumnVisibility,
  });

  // HANDLER/s
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateSearchInput?.(event);
    if (query === undefined) {
      setFilterState(event.target.value);
    } else {
      setQuery?.(event.target.value);
    }
  };

  // this help us to solve the issue of the table not updating on first render
  useEffect(() => {
    if (!tableMetaData) {
      return () => {};
    }
    if (tableMetaData?.per_page) {
      table.setPageSize(tableMetaData?.per_page);
    }
  }, [dataSet?.data?.meta, dataSet?.isLoading]);

  return (
    <div className='flex flex-col'>
      <section className='flex items-center justify-between py-2 '>
        <div className='flex items-center gap-4'>
          <section className='w-56'>
            <UiTextInputBase
              type='text'
              value={query || filterState}
              onChange={handleChange}
              placeholder={searchPlaceHolder}
              className='h-8 w-full  pl-2 ring-1 ring-extraLightGray border-none text-sm text-body'
              icon={
                <>
                  {query || filterState ? (
                    <button
                      type='button'
                      className='flex items-center rounded justify-center bg-primary/10 text-primary p-0.5'
                      onClick={() => {
                        setFilterState('');
                        setQuery?.('');
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
          {/* <MultipleDeleteChip table={table} handleDelete={deleteEntries} /> */}
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

      {tableMetaData?.per_page ? (
        <div className='flex items-center justify-between  h-10 px-4 '>
          <section className='flex items-center gap-2 text-sm font-medium text-darkGray'>
            <p>Showing:</p>
            <p>
              <span className='font-semibold text-heading'>
                {tableData?.length}
              </span>{' '}
              of <span>{tableMetaData?.total}</span>
            </p>
          </section>
          <section className='flex items-center justify-end gap-3 '>
            <>
              <UiButton
                text='First'
                buttonType='tertiary'
                className='h-7 flex-row-reverse font-semibold'
                icon={<ChevronsLeft className='size-4' />}
                disabled={tableMetaData?.current_page === 1}
              />
              <UiButton
                disabled={tableMetaData?.current_page === 1}
                text='Prev'
                buttonType='tertiary'
                className='h-7 flex-row-reverse font-semibold'
                icon={<ChevronLeft className='size-4' />}
              />
              {!!tableData.length && (
                <span className='flex items-center gap-1 text-sm'>
                  <span className='font-medium'> Page </span>
                  <strong>{tableMetaData?.current_page} </strong>
                  <span className='font-medium'> of </span>
                  <strong> {tableMetaData?.last_page}</strong>
                </span>
              )}
              <UiButton
                disabled={
                  tableMetaData?.current_page === tableMetaData?.last_page
                }
                icon={<ChevronRight className='size-4' />}
                text='Next'
                buttonType='tertiary'
                className=' h-7 font-semibold'
              />
              <UiButton
                disabled={
                  tableMetaData?.current_page === tableMetaData?.last_page
                }
                icon={<ChevronsRight className='size-4' />}
                text='Last'
                buttonType='tertiary'
                className=' h-7 font-semibold'
              />
            </>
          </section>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UiTable;
