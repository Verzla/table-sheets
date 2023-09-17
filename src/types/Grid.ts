import { StyleVariableOptions } from '../hooks/useSetVariables';
import React from 'react';

export type Identifiable<T> = T & { id: number };

export type OnDataUpdate<T, F extends keyof T = keyof T> = (
  rowIndex: number,
  field: F | keyof T,
  value: T[F]
) => void;

export type ColumnState = {
  isActive: boolean;
  isSelected: boolean;
}

export type ColumnRenderer<T> = {
  title: (row: T) => string;
  value: (row: T, state?: ColumnState) => React.ReactNode | string;
}

export interface GridProps<T, F extends keyof T = keyof T> {
  // Mandatory
  data: Identifiable<T>[];
  columns: ColumnRenderer<Identifiable<T>>[];

  // Optional
  styleVariables?: StyleVariableOptions;
  onChange?: OnDataUpdate<Identifiable<T>, F>;
}
