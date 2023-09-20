import { InputProps } from '../input/Input';
type IdentifiableContent<T> = T & {
    id: number;
    name: string;
};
interface AutocompleteProps<T> extends Omit<InputProps, 'onChange' | 'value'> {
    name: string;
    data: IdentifiableContent<T>[];
    value?: IdentifiableContent<T> | null;
    onChange: (completeWith: IdentifiableContent<T>) => void;
}
export declare function Autocomplete<T>({ name, data, value: selectedDataValue, onChange, ...props }: AutocompleteProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
