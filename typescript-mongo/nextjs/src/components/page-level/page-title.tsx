'use client';

import { Button } from '@/components/ui/button';
import { CommandIcon, MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PageTitle({
  title,
  endActions,
  startActions,
}: {
  title: string;
  startActions?: React.ReactNode;
  endActions?: React.ReactNode;
}) {
  const router = useRouter();

  const handleGoBack = () => router.back();

  return (
    <div className="w-full flex flex-row items-center justify-between gap-2 md:gap-0 px-2 md:px-0">
      <div>
        <h1 className="text-xl font-medium text-zinc-300">{title}</h1>
      </div>
      <div>
        {startActions}
        <Button
          className="py-1.5 leading-none hover:text-zinc-400"
          onClick={handleGoBack}
          size="sm"
        >
          <kbd>
            <span className="font-mono text-sm flex gap-x-2.5">
              <CommandIcon className="w-4 h-4 inline-block" />
              <MoveLeftIcon className="w-4 h-4 inline-block" />
            </span>
          </kbd>
        </Button>
        {endActions}
      </div>
    </div>
  );
}
