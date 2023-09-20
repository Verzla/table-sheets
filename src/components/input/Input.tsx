import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
} from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef(
  (props: InputProps, ref?: ForwardedRef<HTMLInputElement>) => (
    <input className={'ts-input-field'} {...props} ref={ref} />
  )
);
