'use client';

import { cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavigationLinks = ({ navLinks }: { navLinks: { title: string; href: string }[] }) => {
  const pathname = usePathname();

  return navLinks?.length > 0
    ? navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            `flex items-center justify-center px-3 py-0.5 md:py-1.5 rounded-lg border-0 transition-colors bg-transparent hover:bg-zinc-900
        focus:ring-1 focus:ring-zinc-600 focus:ring-offset-1 focus:ring-offset-zinc-700 leading-none select-none
        text-zinc-300 text-sm font-medium tracking-normal whitespace-nowrap`,
            {
              'text-amber-500': pathname.includes(link.href),
            },
          )}
        >
          {link.title}
        </Link>
      ))
    : null;
};
