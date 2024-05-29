import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export const INPUT_SIZE = {
  sm: 'sm',
  md: 'base',
  lg: 'lg',
} as const;

export type InputSize = keyof typeof INPUT_SIZE;

export type InputProps = Omit<JSX.IntrinsicElements['input'], 'ref' | 'size'> & {
  size?: InputSize;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          'w-full h-full border font-normal border-zinc-700 rounded-md leading-none',
          'focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent',
          'bg-zinc-900 text-zinc-100 disabled:bg-zinc-800 disabled:cursor-not-allowed',
          {
            'text-sm px-2.5 py-1': size === 'sm',
            'text-base px-3 py-1.5': size === 'md',
            'text-lg px-4 py-2': size === 'lg',
          },
          className,
        )}
      />
    );
  },
);

Input.displayName = 'Input';
