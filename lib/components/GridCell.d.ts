import React from 'react';
import { CellState } from '../types/Grid';
interface GridCellProps {
    render: (state: CellState) => React.ReactNode;
    cursor: [number, number];
    readonly?: boolean;
}
export declare const GridCell: ({ render, readonly, cursor: [y, x], }: GridCellProps) => import("react/jsx-runtime").JSX.Element;
export {};
