import { cn } from "@lib";

export function CodeBlock({ json, className }) {
  return (
    <div
      className={cn(
        `relative font-mono text-sm font-normal bg-gradient-to-br
        from-zinc-600 via-zinc-800 to-yellow-600 text-zinc-300
        whitespace-pre-wrap text-left rounded-sm p-0.5
        overflow-hidden h-full flex flex-col overflow-y-auto
        shadow-lg shadow-sky-900/20`,
        className
      )}
    >
      <div
        className="flex-1 w-full h-full p-0 overflow-hidden rounded-sm
      flex flex-col"
      >
        <div
          className="bg-gradient-to-bl w-full h-full
        from-zinc-900 to-zinc-800 text-zinc-300
        rounded-sm p-2 overflow-auto"
        >
          <code>{JSON.stringify(json, undefined, 2)}</code>
        </div>
      </div>
    </div>
  );
}
