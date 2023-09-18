/// <reference types="react" />
import { GridState } from '../types/Grid';
export declare const useGridState: (xMax: number, yMax: number) => GridState;
export declare const GridContext: import("react").Context<GridState>;
export declare const useGridContext: () => GridState;
