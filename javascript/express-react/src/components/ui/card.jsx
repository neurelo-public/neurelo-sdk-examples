import { cn } from "@lib";

export function Card({
  children,
  className = undefined,
  size = "md",
  outlined = true,
}) {
  return (
    <div
      className={cn(
        "w-full dark:bg-zinc-950 bg-white/40 mx-auto flex flex-col rounded-lg items-center justify-center p-8 gap-8",
        {
          "max-w-md": size === "md",
          "max-w-lg": size === "lg",
          "max-w-xl": size === "xl",
          "max-w-full": size === "full",

          "border-[0.75px] border-zinc-800": outlined,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
