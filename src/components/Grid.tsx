import React, { useRef } from 'react';
import css from '../style/Grid.module.css';
import { GetGridRows } from './GridStyleFuncs';
import { useSetVariables } from '../hooks/useSetVariables';
import { GridProps } from '../types/Grid';

export function Grid<T>({
  data,
  columns,
  styleVariables,
  onChange,
}: GridProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  useSetVariables(ref, styleVariables);

  return (
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
            <div key={`gh_${cIndex}`}>{c.value(d)}</div>
          ))}
          {/*<div onClick={() => onChange(dIndex, 'id', d.id + 1)}>{d.id}</div>*/}
          {/*<div className={css.active}>RowRender</div>*/}
          {/*<div>RowRender</div>*/}
          {/*<div>RowRender</div>*/}
        </div>
      ))}
    </div>
  );
}
