'use client';

import { Button } from '@/components/ui/button';
import { RefreshCwIcon, TimerResetIcon } from 'lucide-react';

const isDev = process.env.NODE_ENV === 'development';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const handleReset = () => {
    window.location.href = '/list-actors';
  };

  console.log({ error });

  return (
    <div className="flex-1 h-full f-full container mx-auto items-center flex flex-row">
      <div className="w-full flex flex-col items-center gap-y-8 border border-zinc-800 p-3">
        <h2 className="text-center text-lg font-semibold text-zinc-200">Something went wrong!</h2>
        {isDev ? (
          <p className="text-center text-zinc-400">
            {error.message}
            {error.digest ? (
              <>
                <br />
                <span className="text-zinc-500">{error.digest}</span>
              </>
            ) : null}
          </p>
        ) : null}
        <div className="w-full flex flex-row gap-3 items-center justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
            <RefreshCwIcon className="w-4 h-4 ml-2" />
          </Button>
          <Button onClick={handleReset}>
            Reset
            <TimerResetIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Error;
