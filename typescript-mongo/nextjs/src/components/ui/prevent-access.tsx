'use client';

import { useStore } from '@/lib/hooks/useStore';
import { SafeAuth } from '../auth/login-action';
import { FancyIcon } from './fancy-icon';
import { NoSsr } from './no-ssr';

export const PreventAccess = ({
  children,
  preventGuest = true,
}: {
  children: React.ReactNode;
  preventGuest?: boolean;
}) => {
  const store = useStore<SafeAuth>({ key: 'auth', storeType: 'local' });
  const isGuest = !store.value;

  let returnNodes = <>{children}</>;

  if (preventGuest && isGuest) {
    returnNodes = (
      <div
        className="w-full h-[calc(100vh-11rem)] flex-1 flex items-center justify-center bg-zinc-900 rounded-lg py-10 px-4
        border border-zinc-700">
        <div className="text-center flex flex-col gap-y-2">
          <div className="w-full flex items-center justify-center mb-4">
            <FancyIcon
              icon="Lock"
              containerClassname="w-20 h-20"
              iconClassname="w-12 h-12"
            />
          </div>
          <h1 className="text-5xl font-bold text-zinc-200">Access Denied</h1>
          <p className="text-lg text-zinc-400">You need to login to access this page</p>
        </div>
      </div>
    );
  }

  return <NoSsr>{returnNodes}</NoSsr>;
};
