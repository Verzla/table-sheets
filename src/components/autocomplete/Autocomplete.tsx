import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Input, InputProps } from '../input/Input';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

type IdentifiableContent<T> = T & { id: number; name: string };

interface AutocompleteProps<T> extends Omit<InputProps, 'onChange' | 'value'> {
  name: string; // Has to be unique to prevent key issues
  data: IdentifiableContent<T>[];
  value?: IdentifiableContent<T> | null;
  onChange: (completeWith: IdentifiableContent<T>) => void;
}

export function Autocomplete<T>({
  name,
  data,
  value: selectedDataValue,
  onChange,
  ...props
}: AutocompleteProps<T>) {
  const [search, setSearch] = useState(selectedDataValue?.name ?? '');
  const [itemFocused, setItemFocused] = useState(-1);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Pretty bad search, but it works for now, consider adding some fuzzy search later
  const availableOptions = useMemo(() => {
    if (search && search?.length > 0) {
      setItemFocused(0);
      return data.filter((d) =>
        JSON.stringify(d).toLowerCase().includes(search.toLowerCase())
      );
    } else {
      setItemFocused(-1);
      return data;
    }
  }, [search, data]);

  const updateOnChange = (newValue: IdentifiableContent<T>) => {
    setFocused(false);
    setItemFocused(-1);

    setSearch(newValue.name);
    onChange(newValue);
  };

  useOnClickOutside(ref, () => {
    setTimeout(() => {
      setFocused(false);
    }, 1);
  });

  const autoCompleteKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case ' ':
          {
            setFocused(true);

            // Do not add the space just open the auto complete menu
            if (inputRef.current?.value.length === 0) {
              e.preventDefault();
              return;
            }
          }
          break;
        case 'ArrowUp':
          {
            if (focused) {
              e.preventDefault();
              e.stopImmediatePropagation();
              setItemFocused(Math.max(-1, itemFocused - 1));
            }
          }
          break;
        case 'ArrowDown':
          {
            if (focused) {
              e.preventDefault();
              e.stopImmediatePropagation();
              setItemFocused(Math.min(data.length, itemFocused + 1));
            }
          }
          break;
        case 'Escape':
          {
            setItemFocused(-1);
            setFocused(false);
          }
          break;
        case 'Tab':
        case 'Enter':
          {
            // If we're focused we just select the item, otherwise we have to remove the selection from the main gridstate
            if (focused && availableOptions.length > 0) {
              e.preventDefault();
              updateOnChange(availableOptions[itemFocused]);
            }
          }
          break;
        case 'Shift':
        case 'Backspace':
          {
            // Just don't "setFocused(true)";
          }
          break;
        default: {
          setFocused(true);
          break;
        }
      }
    },
    [availableOptions, focused, itemFocused, inputRef]
  );

  useEventListener('keydown', (e) => autoCompleteKeyDown(e), inputRef);

  return (
    <div className={'ts-autocomplete'} ref={ref}>
      <Input
        {...props}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onDoubleClickCapture={() => setFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocused(false);
          }, 1);
        }}
        ref={inputRef}
      />
      {focused && (
        <div className={'ts-autocomplete-items'}>
          {availableOptions.map((d, dIndex) => (
            <div
              key={`ac_${name}_${d.id}`}
              className={dIndex === itemFocused ? 'ts-autocomplete-active' : ''}
              // onClick={() => {
              //   // TODO the onClick is not working
              //   console.log('onClick', d);
              //   updateOnChange(d);
              // }}
            >
              {d.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
