import React, {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  RefObject,
} from 'react';
import css from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef(
  (props: InputProps, ref?: ForwardedRef<HTMLInputElement>) => (
    <input className={css.input} {...props} ref={ref} />
  )
);
