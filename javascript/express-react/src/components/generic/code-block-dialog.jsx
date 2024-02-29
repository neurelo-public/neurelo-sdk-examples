import { useState } from "react";
import { CodeBlock } from ".";
import { Button } from "@components/ui";
import { FileJsonIcon, XIcon } from "lucide-react";

export function CodeBlockTrigger({ title, json }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        size="sm"
        startIcon={FileJsonIcon}
        className="w-8 h-8 p-0"
      />
      <CodeBlockDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={title}
        json={json}
      />
    </>
  );
}

export function CodeBlockDialog({ isOpen, onClose, title, json }) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog open onClose={onClose} className="overflow-hidden max-h-screen">
      <div
        onClick={onClose}
        className="z-50 w-screen h-screen bg-zinc-950/30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden backdrop-blur-sm"
      />
      <div
        className="z-[55] bg-zinc-950 text-zinc-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg
          border border-zinc-800"
      >
        <div className="w-full flex flex-nowrap items-center justify-between py-2 px-4">
          <h2 className="text-lg font-medium text-zinc-200">{title}</h2>
          <Button
            onClick={onClose}
            size="sm"
            startIcon={XIcon}
            className="w-8 h-8 p-0"
          />
        </div>

        <div className="p-2">
          <CodeBlock json={json} className="max-h-[calc(100vh-200px)]" />
        </div>
      </div>
    </dialog>
  );
}
