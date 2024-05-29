import { cn } from '@/lib';
import { forwardRef } from 'react';
import { Input, InputProps, InputSize } from './input';

export const FormField = forwardRef<
  HTMLFieldSetElement,
  {
    label: string;
    inputProps: InputProps & { ref: React.Ref<HTMLInputElement> };
    size?: InputSize;
    errors?: string;
  }
>(({ label, inputProps, size = 'md', errors }, ref) => {
  return (
    <fieldset
      ref={ref}
      name={inputProps.name}
      className={cn(`w-full flex flex-col flex-grow-1 gap-1`)}
    >
      <label
        htmlFor="name"
        className="text-sm text-zinc-500 font-medium"
      >
        {label}
      </label>
      <Input
        {...inputProps}
        size={size}
      />
      {errors && <p className="text-xs text-red-500">{errors}</p>}
    </fieldset>
  );
});

FormField.displayName = 'FormField';
