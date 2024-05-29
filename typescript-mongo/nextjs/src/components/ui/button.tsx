import { cn } from '@/lib/utils';
import React from 'react';
import SpinningLoader from './spinning-loader';

export const BUTTON_SIZE = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
} as const;
export type ButtonSize = keyof typeof BUTTON_SIZE;

export const BUTTON_COLORS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  warning: 'warning',
  danger: 'danger',
} as const;
export type ButtonColor = keyof typeof BUTTON_COLORS;

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'size'> & {
  size?: ButtonSize;
  color?: ButtonColor;
  isLoading?: boolean;
};

export const Button = ({
  className,
  size = 'md',
  color = 'default',
  children = null,
  isLoading = false,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={cn(
      'w-auto rounded-md',
      'focus:outline-none focus-visible:outline-none ring-0 border-0 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:border-0',
      'transition-all duration-300 ease-in-out',
      'select-none cursor-pointer disabled:opacity-70 disabled:text-opacity-80 disabled:cursor-not-allowed',
      'flex flex-row items-center justify-center',
      {
        'h-8 text-sm font-medium px-2.5 py-1 gap-1': size === 'sm',
        'h-10 text-base font-medium px-3 py-1.5 gap-2': size === 'md',
        'h-11 text-lg font-semibold px-5 py-2 gap-2': size === 'lg',
      },
      {
        'ring-zinc-600 focus-visible:ring-zinc-600 focus-visible:ring-offset-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 disabled:hover:bg-zinc-900':
          color === 'default',
        'focus-visible:ring-sky-600 focus-visible:ring-offset-sky-700 bg-sky-900 hover:bg-sky-800 text-sky-200 disabled:hover:bg-sky-900':
          color === 'primary',
        'focus-visible:ring-zinc-600 focus-visible:ring-offset-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 disabled:hover:bg-zinc-900':
          color === 'secondary',
        'focus-visible:ring-yellow-600 focus-visible:ring-offset-yellow-700 bg-yellow-900 hover:bg-yellow-800 text-yellow-200 disabled:hover:bg-yellow-900':
          color === 'warning',
        'focus-visible:ring-red-600 focus-visible:ring-offset-red-700 bg-red-900 hover:bg-red-800 text-red-200 disabled:hover:bg-red-900':
          color === 'danger',
      },
      {
        'px-1 py-1': isLoading && size === 'sm',
        'px-1.5 py-1.5': isLoading && size === 'md',
        'px-2 py-2': isLoading && size === 'lg',
      },
      className,
    )}>
    {isLoading ? <SpinningLoader /> : children}
  </button>
);
