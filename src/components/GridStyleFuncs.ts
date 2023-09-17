type GridRowsOptions = {
  headerHeight?: number;
  rowHeight?: number;
};

export const GetGridRows = (
  dataLength: number,
  options: GridRowsOptions = {
    headerHeight: 60,
    rowHeight: 50,
  }
): string =>
  `${options.headerHeight}px repeat(${dataLength}, ${options.rowHeight}px)`;
