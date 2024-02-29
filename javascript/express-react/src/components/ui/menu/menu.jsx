import { cn } from "@lib";
import { useMemo, useState } from "react";
import { MenuProvider } from "./ctx";
import { useMenuContext } from "./hook";

export function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(() => ({ isOpen, setIsOpen }), [isOpen, setIsOpen]);

  return (
    <MenuProvider value={value}>
      <div
        className="flex flex-row items-center relative"
        onBlur={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) {
            return;
          }
          setIsOpen(false);
        }}
      >
        {children}
      </div>
    </MenuProvider>
  );
}

export function MenuTrigger({ children }) {
  const { isOpen, setIsOpen } = useMenuContext();

  return (
    <div
      className="flex flex-row items-center justify-center cursor-pointer z-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      {children}
    </div>
  );
}

export function MenuContent({ children }) {
  const { isOpen, setIsOpen } = useMenuContext();

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        `absolute z-10 top-full right-0 w-full min-w-[12rem] bg-zinc-900/40
        rounded-md ring-1 ring-zinc-700 p-1 backdrop-blur-sm
        transform translate-y-2 shadow-2xl shadow-zinc-950`,
        {
          hidden: !isOpen,
          "flex flex-col flex-1 gap-y-1": isOpen,
        }
      )}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(false);
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
          return;
        }
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}
