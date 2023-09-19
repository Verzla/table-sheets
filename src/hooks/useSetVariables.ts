import { RefObject, useLayoutEffect } from 'react';

// All the options will be prefixed with `tsGrid`
// Example: var(--tsGrid-headerBg);
const variableStylePrefix = 'tsGrid-';

interface StyleVariables {
  primary: string;
  headerBg: string;
  headerFontColor: string;
  border: string;
  selectedBg: string;
}

export type StyleVariableOptions = Partial<StyleVariables>;

const DEFAULT_PRIMARY = '#926AA6';

const DEFAULT_STYLE_OPTIONS: StyleVariables = {
  primary: DEFAULT_PRIMARY,
  headerBg: '#EDE7FB',
  headerFontColor: DEFAULT_PRIMARY,
  border: '#E9E9E9',
  selectedBg: '#F8F5FF',
};

export const useSetVariables = (
  ref: RefObject<HTMLDivElement>,
  options: StyleVariableOptions
) => {
  const opts: StyleVariables = {
    ...DEFAULT_STYLE_OPTIONS,
    ...options,
  };

  // TODO Support SSR by using a isomorphic layout effect hook.
  useLayoutEffect(() => {
    if (ref && ref.current) {
      Object.keys(opts).map((o) => {
        ref.current?.style.setProperty(
          `--${variableStylePrefix}${o}`,
          opts[o as keyof StyleVariables]
        );
      });
    }
  }, [ref, opts]);
};
