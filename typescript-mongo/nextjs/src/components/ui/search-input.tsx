'use client';

import { Input } from '@/components/ui/input';
import { useGlobalKeyBinding } from '@/lib/hooks/useGlobalKeyBinding';
import { cn } from '@/lib/utils';
import { SortOrder } from '@/types/generic';
import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import { CommandIcon, SearchIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type ComponentProps = {
  value: string;
  page: number;
};

export default function SearchInput({
  value,
  page,
  orderBy,
  sortBy,
}: {
  value: string;
  page: number;
  orderBy: string;
  sortBy: SortOrder;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [search, setSearch] = React.useState<string>(value);
  const [debouncedSearch] = useDebouncedValue(search, 1000); // 1s debounce

  // Listen for Cmd+K to focus on search input
  useGlobalKeyBinding({
    blockInputEl: false,
    cmd: true,
    preventDefault: false,
    keyBindings: {
      k: () => {
        if (searchInputRef?.current) {
          searchInputRef?.current?.focus();
        }
      },
    },
  });

  useDidUpdate(() => {
    if (debouncedSearch !== undefined && value !== debouncedSearch) {
      const searchX =
        (typeof debouncedSearch === 'string' && debouncedSearch === 'undefined') || !debouncedSearch
          ? ''
          : debouncedSearch;
      router.push(`${pathname}?page=1&search=${searchX}&orderBy=${orderBy}&sortBy=${sortBy}`);
      searchInputRef?.current?.focus();
    }
  }, [debouncedSearch, page, pathname, router, value, orderBy, sortBy]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearch('');
    }
    if (e.key === 'ArrowLeft' && e.metaKey) {
      router.back();
    }
    if (e.key === 'ArrowRight' && e.metaKey) {
      router.forward();
    }
    if (e.key === 'Enter' && search !== undefined) {
      router.push(`${pathname}?page=${page}&search=${search}`);
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (search !== undefined && search.length > 0) {
      e.currentTarget.select();
    }
  };

  return (
    <div
      className={cn(
        'w-full h-10 px-4 py-0 text-base border font-normal border-zinc-800 rounded-md',
        'focus-within:outline-none focus-within:ring-1 focus-within:ring-zinc-500 focus-within:border-transparent',
        'bg-zinc-900 text-zinc-200',
        'duration-200 ease-in-out transition-all group',
        'flex flex-row items-center flex-nowrap gap-x-2',
      )}
    >
      <SearchIcon className="w-6 h-6 inline-block text-zinc-700 group-focus-within:text-zinc-600" />
      <Input
        ref={searchInputRef}
        name="search"
        value={search || ''}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        placeholder="Search"
        spellCheck={false}
        autoFocus={false}
        autoComplete="off"
        className="flex-1 bg-transparent h-full py-0 px-0
                  ring-0 border-none z-10
                  focus:ring-0 focus:border-0 select-all"
      />
      <kbd
        className="outline-none border rounded-md py-1 px-2 leading-none text-sm select-none
          transition-all duration-300 ease-in-out bg-zinc-950 text-zinc-200 
          border-zinc-700 group-focus-within:text-zinc-400"
      >
        <span
          className="font-mono flex flex-row flex-nowrap items-center
            justify-center text-current"
        >
          <CommandIcon className="w-3.5 h-3.5 inline-block mr-1" />K
        </span>
      </kbd>
      {!!search ? (
        <kbd
          className="outline-none border rounded-md py-1 px-2 leading-none text-sm select-none
            transition-all duration-300 ease-in-out
            bg-red-950/30 hover:bg-red-700/30 text-red-500 border-red-700/75
            focus-visible:ring-red-500"
        >
          <span
            className="font-mono flex flex-row flex-nowrap items-center
              justify-center text-current"
          >
            Esc
          </span>
        </kbd>
      ) : null}
    </div>
  );
}
