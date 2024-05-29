import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { GithubIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { AccountAvatar } from '../auth/account-avatar';
import { LoginAndRegister } from './login-and-register';
import { NavigationLinks } from './navigation-links';

const NAVIGATION_LINKS = [
  {
    title: 'Films',
    href: '/list-films',
  },
  {
    title: 'Actors',
    href: '/list-actors',
  },
  {
    title: 'Custom Query',
    href: '/custom-query',
  },
  {
    title: 'Accounts',
    href: '/list-accounts',
  },
];

export default function Header() {
  return (
    <div className="z-40 sticky top-0 left-0 w-full border-b border-zinc-800 bg-zinc-950/20 backdrop-blur-sm">
      <div
        className="w-full items-center justify-between text-sm flex
        container mx-auto px-2 md:px-4 lg:px-8 py-3">
        {/* App logo */}
        <div className="w-full md:w-auto flex flex-row flex-nowrap items-center justify-start">
          <Link href="/">
            <Suspense
              fallback={
                <Skeleton className="w-20 h-6">
                  <span className="sr-only">Loading...</span>
                </Skeleton>
              }>
              <Image
                src="/neurelo.png"
                alt="App Logo"
                width={90}
                height={24}
                priority
              />
            </Suspense>
          </Link>
        </div>

        {/* Navigation Links */}
        {NAVIGATION_LINKS.length > 0 ? (
          <div className="flex flex-row items-center justify-center gap-2 tracking-normal text-lg">
            <NavigationLinks navLinks={NAVIGATION_LINKS} />

            <LoginAndRegister />

            <Link
              href="https://github.com/neurelo-public/neurelo-sdk-examples"
              className="text-yellow-500 focus:underline decoration-sky-500"
              tabIndex={-1}
              target="_blank">
              <Button
                size="sm"
                className="h-auto p-1.5">
                <GithubIcon className="w-5 h-5 inline-block" />
              </Button>
            </Link>

            <AccountAvatar />
          </div>
        ) : null}
      </div>
    </div>
  );
}
