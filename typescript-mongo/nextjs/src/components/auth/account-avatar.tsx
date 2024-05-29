'use client';

import { useStore } from '@/lib/hooks/useStore';
import { NoSsr } from '../ui/no-ssr';
import { Tooltip } from '../ui/tooltip';
import { SafeAuth } from './login-action';

export const AccountAvatar = () => {
  const store = useStore<SafeAuth>({ key: 'auth', storeType: 'local' });
  const isGuest = !store.value;

  if (isGuest) return <NoSsr>{null}</NoSsr>;

  const userFullName = store.value?.name;
  const userFirstName = userFullName?.split(' ')?.[0];
  const userLastName = userFullName?.split(' ')?.[1];

  // FL : First Letter
  const userFirstNameFL = userFirstName?.slice(0, 1)?.toUpperCase();
  const userLastNameFL = userLastName?.slice(0, 1)?.toUpperCase();

  return (
    <NoSsr>
      <Tooltip
        content={userFullName}
        showArrow>
        <div className="w-10 h-10 ml-4 bg-gradient-to-br from-sky-950 via-zinc-800/60 to-sky-900 rounded-full flex items-center justify-center ring-4 ring-sky-950 ring-offset-1 ring-offset-sky-700">
          <div className="flex gap-x-0.5 text-sm font-medium text-zinc-50 items-center justify-center leading-none select-none cursor-default">
            <span>{userFirstNameFL}</span>
            <span>{userLastNameFL}</span>
          </div>
        </div>
      </Tooltip>
    </NoSsr>
  );
};
