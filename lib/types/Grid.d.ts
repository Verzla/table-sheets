import { StyleVariableOptions } from '../hooks/useSetVariables';
import { ReactNode } from 'react';
export type Identifiable<T> = T & {
    id: number;
};
export type GridPoint = {
    x: number;
    y: number;
};
export interface GridState {
    selections: Array<GridPoint>;
    currentSelection: GridPoint | null;
    select: (e: MouseEvent, point: GridPoint) => void;
    getGridCellState: (point: GridPoint) => CellState;
    clearSelections: () => void;
    move: (position: 'x' | 'y', step: number, addSelection?: boolean) => void;
}
export type OnDataUpdate<T, F extends keyof T = keyof T> = (rowIndex: number | number[], field: F | keyof T, value: T[F]) => void;
export type CellState = {
    rowIndex: number;
    isActive: boolean;
    isSelected: boolean;
};
export type ColumnRenderer<T> = {
    title: (row: T) => string;
    value: (row: T, state: CellState) => ReactNode | string;
    readonly?: boolean;
};
export interface GridProps<T, F extends keyof T = keyof T> {
    data: Identifiable<T>[];
    columns: ColumnRenderer<Identifiable<T>>[];
    styleVariables?: StyleVariableOptions;
    onChange?: OnDataUpdate<Identifiable<T>, F>;
}
