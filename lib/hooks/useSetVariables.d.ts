import { RefObject } from 'react';
interface StyleVariables {
    primary: string;
    headerBg: string;
    headerFontColor: string;
    border: string;
}
export type StyleVariableOptions = Partial<StyleVariables>;
export declare const useSetVariables: (ref: RefObject<HTMLDivElement>, options: StyleVariableOptions) => void;
export {};
