import { Button } from "@components/ui";
import { CommandIcon, MoveLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function PageTitle({ title, endActions, startActions }) {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-2 md:gap-0 px-2 md:px-0">
      <div>
        <h1 className="text-xl font-medium text-zinc-300">{title}</h1>
      </div>
      <div>
        {startActions}
        <Link to={-1}>
          <Button className="py-1.5 leading-none" size="sm" tabIndex={-1}>
            <kbd>
              <span className="font-mono text-sm flex gap-x-2.5">
                <CommandIcon className="w-4 h-4 inline-block" />
                <MoveLeftIcon className="w-4 h-4 inline-block" />
              </span>
            </kbd>
          </Button>
        </Link>
        {endActions}
      </div>
    </div>
  );
}
