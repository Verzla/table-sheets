import React, { useRef } from 'react';
import css from '../style/Grid.module.css';
import { GetGridRows } from './GridStyleFuncs';
import { useSetVariables } from '../hooks/useSetVariables';
import { GridProps } from '../types/Grid';
import { GridContext, useGridState } from './GridContext';
import { GridCell } from './GridCell';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

export function Grid<T>({ data, columns, styleVariables }: GridProps<T>) {
  const gridState = useGridState(columns.length - 1, data.length - 1);
  const ref = useRef<HTMLDivElement>(null);

  useSetVariables(ref, styleVariables ?? {});

  useOnClickOutside(ref, () => {
    gridState.clearSelections();
  });

  useEventListener(
    'keydown',
    (e) => {
      if (e.defaultPrevented) {
        return;
      }

      switch (e.key) {
        case 'Tab':
          {
            if (e.shiftKey) {
              gridState.move('x', -1);
            } else {
              gridState.move('x', 1);
            }
          }
          break;
        case 'ArrowRight':
          {
            gridState.move('x', 1, e.shiftKey);
          }
          break;
        case 'ArrowLeft':
          {
            gridState.move('x', -1, e.shiftKey);
          }
          break;
        case 'ArrowUp':
          {
            gridState.move('y', -1, e.shiftKey);
          }
          break;
        case 'ArrowDown':
          {
            gridState.move('y', 1, e.shiftKey);
          }
          break;
      }
    },
    ref
  );

  return (
    <GridContext.Provider value={gridState}>
      <div
        className={css.grid}
        style={{ gridTemplateRows: GetGridRows(data.length) }}
        ref={ref}
      >
        <div className={css.header} style={{ gridRow: 1 }}>
          {columns.map((c, cIndex) => (
            <div key={`gh_${cIndex}`}>{c.title(data[cIndex])}</div>
          ))}
        </div>
        {data.map((d, dIndex) => (
          <div
            className={css.row}
            style={{ gridRow: dIndex + 2 }}
            key={`gr_${dIndex}`}
          >
            {columns.map((c, cIndex) => (
              <GridCell
                key={`gc_${cIndex}`}
                readonly={c.readonly}
                cursor={[dIndex, cIndex]}
                render={(state) => c.value(d, state)}
              />
            ))}
          </div>
        ))}
      </div>
    </GridContext.Provider>
  );
}
