import React from 'react';
import { useGridContext } from './GridContext';
import { CellState } from '../types/Grid';

interface GridCellProps {
  render: (state: CellState) => React.ReactNode;
  cursor: [number, number]; // y, x
  readonly?: boolean;
}

export const GridCell = ({
  render,
  readonly,
  cursor: [y, x],
}: GridCellProps) => {
  const { select, getGridCellState } = useGridContext();
  const cellState: CellState = getGridCellState({ y, x });

  return (
    <div
      className={'ts-cell'}
      data-readonly={Boolean(readonly)}
      data-y={y}
      data-x={x}
    >
      <div
        className={[
          cellState.isActive ? 'ts-cell-active' : '',
          cellState.isSelected ? 'ts-cell-focus' : '',
        ].join(' ')}
        onClick={(e) => {
          if (!readonly) {
            select(e.nativeEvent, { y, x });
          }
        }}
      >
        {render(cellState)}
      </div>
    </div>
  );
};
