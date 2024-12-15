'use client';

import type { AgGridEvent, ColDef } from 'ag-grid-community';
import { AgGridReact, type AgGridReactProps } from 'ag-grid-react';
import { useCallback, useMemo } from 'react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-quartz.css';

interface GridProps extends AgGridReactProps {
  _data?: unknown[];
  _setSelectedData: (data: unknown[]) => void;
}

export const Table: React.FC<Readonly<GridProps>> = ({
  _data,
  _setSelectedData,
  columnDefs,
  ...props
}) => {
  const updateSelectedCategories = useCallback(
    (e: AgGridEvent<string>) => {
      const selectedRows = [] as unknown[];
      e.api.forEachLeafNode((row) => {
        if (row.isSelected()) {
          if (row.data !== undefined) {
            selectedRows.push(row.data);
          }
        }
      });
      _setSelectedData(selectedRows);
    },
    [_setSelectedData],
  );

  const columns = useMemo(
    () => [
      {
        ...categoriesColumns[0],
        ...columnDefs![0],
        ...{
          headerName: `${columnDefs![0]!.headerName!}${
            (_data?.length ?? 0) > 0 ? ` - ${_data?.length}` : ''
          }`,
        },
      },
    ],
    [_data, columnDefs],
  );

  return (
    <AgGridReact
      rowDragManaged
      tooltipShowDelay={500}
      rowSelection='multiple'
      rowMultiSelectWithClick={true}
      rowData={_data}
      columnDefs={columns}
      onSelectionChanged={updateSelectedCategories}
      onRowDragEnd={updateSelectedCategories}
      {...props}
    />
  );
};

const categoriesColumns: ColDef[] = [
  {
    cellDataType: 'text',

    lockPosition: 'left',
    initialFlex: 1,
    resizable: false,

    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
      filterPlaceholder: 'Filter...',
    },
    floatingFilter: true,
    floatingFilterComponentParams: {
      filterPlaceholder: 'Filter...',
    },
    rowDrag: true,

    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    headerCheckboxSelectionCurrentPageOnly: true,
  },
];
