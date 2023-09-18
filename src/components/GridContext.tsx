import { createContext, useCallback, useContext, useState } from 'react';
import { CellState, GridPoint, GridState } from '../types/Grid';
import css from '../style/Grid.module.css';

export const useGridState = (xMax: number, yMax: number): GridState => {
  const [selections, setSelections] = useState<Array<GridPoint>>([]);
  const [currentSelection, setCurrentSelection] = useState<GridPoint | null>(
    null
  );

  const updateSelections = useCallback(
    (e: MouseEvent, { y, x }: GridPoint) => {
      if (e.metaKey || e.ctrlKey) {
        // Add to selections
        setCurrentSelection({ y, x });
        // Remove duplicates for faster searching in isSelected?
        // Or just yolo it, move fast.
        setSelections([...selections, { y, x }]);
      } else {
        setSelections([{ y, x }]);
        setCurrentSelection({ y, x });
      }
    },
    [selections]
  );

  const moveFunction = useCallback(
    (position: 'x' | 'y', step: number, shiftKey = false) => {
      const newSelection: GridPoint = currentSelection ?? { x: 0, y: 0 };

      if (position == 'x') {
        newSelection.x = Math.max(0, Math.min(newSelection.x + step, xMax));
      } else {
        newSelection.y = Math.max(0, Math.min(newSelection.y + step, yMax));
      }

      setSelections(shiftKey ? [...selections, newSelection] : [newSelection]);
      setCurrentSelection(newSelection);

      // Focus the nearest input, would be fun to find a better way than selecting based on the CSS class
      setTimeout(() => {
        if (document) {
          const el = document.querySelector(`.${css.focus}`);
          const nearestInput = el?.querySelector('input');

          if (nearestInput) {
            nearestInput.focus();
          } else if (el && 'activeElement' in document) {
            // Remove the current focus if we cant find an input
            (document.activeElement as HTMLElement).blur();
          }
        }
      }, 10);
    },
    [selections]
  );

  return {
    selections: selections,
    currentSelection: currentSelection,
    select: updateSelections,
    move: moveFunction,
    clearSelections: () => {
      setSelections([]);
      setCurrentSelection(null);
    },
    getGridCellState: ({ x, y }: GridPoint): CellState => {
      return {
        rowIndex: y,
        isSelected: selections.some((p) => p.y === y && p.x === x),
        isActive:
          currentSelection !== null &&
          currentSelection.x === x &&
          currentSelection.y === y,
      };
    },
  };
};

export const GridContext = createContext<GridState>({
  selections: [],
  currentSelection: null,
  move: () => {},
  select: () => {},
  getGridCellState: () => ({ isSelected: false, isActive: false, rowIndex: 0 }),
  clearSelections: () => {},
});

export const useGridContext = () => useContext(GridContext);
