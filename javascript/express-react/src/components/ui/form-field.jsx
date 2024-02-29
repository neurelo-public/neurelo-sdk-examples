import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full px-2 py-1.5 border border-zinc-700 focus:outline-none focus:border-zinc-500
        bg-zinc-900 rounded-md transition-colors duration-300 ease-in-out placeholder:text-zinc-500 text-zinc-100"
    />
  );
});

export const FormField = forwardRef(({ label, inputProps, errors }, ref) => {
  return (
    <fieldset
      ref={ref}
      name={inputProps.name}
      className="w-full flex flex-col flex-grow-1 gap-1"
    >
      <label htmlFor="name" className="text-sm text-zinc-400 font-medium">
        {label}
      </label>
      <Input {...inputProps} />
      {errors && <p className="text-xs text-red-500">{errors}</p>}
    </fieldset>
  );
});

FormField.displayName = "FormField";
