import * as RadixDialog from '@radix-ui/react-dialog';
import { icons } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Button } from '../button';
import { FancyIcon } from '../fancy-icon';

export const Dialog = ({
  open,
  onClose,
  mainIcon,
  title = undefined,
  description = undefined,
  children = null,
  primaryCta = 'submit',
  iconClassname = undefined,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
  mainIcon: keyof typeof icons;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  primaryCta?: string;
  iconClassname?: string;
}) => {
  const container = useRef<HTMLElement>();

  useEffect(() => {
    if (!container.current) {
      container.current = window.document.body;
    }
  }, [container]);

  return (
    <RadixDialog.Root
      open={open}
      onOpenChange={(value) => onClose(value)}
      modal
    >
      <RadixDialog.Portal container={container.current}>
        <RadixDialog.Overlay className="z-40 w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800/60 backdrop-blur-sm transition-all duration-700 ease-in-out" />
        <RadixDialog.Content className="z-50 max-w-xl w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 ring-1 ring-zinc-700 rounded-md shadow-xl shadow-zinc-900/60">
          <div className="w-full flex items-center justify-between border-b border-zinc-700 py-4 px-6">
            <div className="w-full flex items-center gap-x-4">
              <FancyIcon
                icon={mainIcon}
                iconClassname={iconClassname}
              />

              <div className="grid grid-cols-1 flex-1 gap-y-1.5">
                <RadixDialog.Title className="text-ellipsis whitespace-nowrap first-letter:uppercase leading-none w-full text-lg font-medium text-zinc-100">
                  {title}
                </RadixDialog.Title>
                <RadixDialog.Description className="text-ellipsis whitespace-nowrap first-letter:uppercase leading-none w-full text-sm font-normal text-zinc-400">
                  {description}
                </RadixDialog.Description>
              </div>
            </div>

            <RadixDialog.Close asChild>
              <Button
                size="sm"
                className="py-1 px-3 border bg-red-950/30 hover:bg-red-700/30 text-red-500 border-red-700/75
                  focus-visible:ring-red-500"
                aria-label="Close"
              >
                <span
                  className="font-mono flex flex-row flex-nowrap items-center
                      justify-center text-current"
                >
                  Esc
                </span>
              </Button>
            </RadixDialog.Close>
          </div>

          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
