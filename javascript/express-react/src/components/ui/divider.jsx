import { cn } from "@lib";

export function Divider({ orientation = "horizontal", className }) {
  return (
    <hr
      className={cn(
        "border-zinc-300 border-none",
        {
          "w-full h-px": orientation === "horizontal",
          "h-full w-px": orientation === "vertical",
        },
        className
      )}
    />
  );
}
