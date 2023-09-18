import React from 'react';
import css from '../style/Grid.module.css';
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
    <div className={css.cell} data-readonly={Boolean(readonly)} data-y={y} data-x={x}>
      <div
        className={[
          cellState.isActive ? css.active : '',
          cellState.isSelected ? css.focus : '',
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
