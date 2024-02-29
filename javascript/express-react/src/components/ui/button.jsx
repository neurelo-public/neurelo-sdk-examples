import { cn } from "@lib";

export function Icon({ icon: IconInternal, size = 24, className }) {
  return <IconInternal size={size} className={cn("stroke-1", className)} />;
}

export function Button({
  type,
  children,
  className,
  tabIndex,
  onClick,
  disabled,
  startIcon = null,
  endIcon = null,
  fullWidth = false,
  theme = "default",
  size = "default",
}) {
  return (
    <button
      type={type}
      tabIndex={tabIndex}
      className={cn(
        `font-medium
        rounded-md transition-colors duration-300 ease-in-out
        flex flex-nowrap items-center justify-center gap-2.5
        border-[0.5px] shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none
        `,
        {
          "border-zinc-700 bg-zinc-500/10 hover:bg-zinc-500/20 text-zinc-100 shadow-zinc-600/10":
            theme === "default",
          "border-sky-700 bg-sky-500/10 hover:bg-sky-500/20 text-sky-200 hover:border-sky-500/60 shadow-zinc-600/10":
            theme === "primary",
          "border-red-700 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:border-red-500/60 shadow-red-800/10":
            theme === "danger",

          "w-full": fullWidth,

          "py-1.5 px-4 text-base": size === "default",
          "py-1.5 px-3 text-sm": size === "sm",
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon ? <Icon icon={startIcon} size={18} /> : null}
      {children}
      {endIcon ? <Icon icon={endIcon} size={18} /> : null}
    </button>
  );
}
