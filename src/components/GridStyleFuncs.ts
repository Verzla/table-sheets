type GridRowsOptions = {
  headerHeight?: number;
  rowHeight?: number;
};

export const GetGridRows = (
  dataLength: number,
  options: GridRowsOptions = {
    headerHeight: 34,
    rowHeight: 40,
  }
): string =>
  `${options.headerHeight}px repeat(${dataLength}, ${options.rowHeight}px)`;

export const GetGridColumns = (
  columns: string[],
): string => columns.join(' ');