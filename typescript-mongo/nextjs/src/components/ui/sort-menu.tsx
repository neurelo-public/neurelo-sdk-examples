import { cn } from '@/lib';
import { SORT_ORDER, SortOrder } from '@/types/generic';
import { SortAsc, SortDesc } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './button';
import { Menu, MenuContent, MenuTrigger } from './menu';

const SORT_TEXT: Record<SortOrder, string> = {
  [SORT_ORDER.asc]: 'Ascending',
  [SORT_ORDER.desc]: 'Descending',
} as const;

const itemsForSort = [
  {
    value: SORT_ORDER.asc,
    label: SORT_TEXT[SORT_ORDER.asc],
  },
  {
    value: SORT_ORDER.desc,
    label: SORT_TEXT[SORT_ORDER.desc],
  },
];

export const SortMenu = ({
  search,
  page,
  orderBy,
  value,
}: {
  search: string;
  page: number;
  orderBy: string;
  value: SortOrder;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [sortBy, setSort] = useState(value);

  const handleSelected = (selectedValue: typeof value) => {
    setSort(selectedValue);
    const searchX =
      (typeof search === 'string' && typeof search === 'undefined') || (!search ? '' : search);
    router.push(
      `${pathname}?page=${page}&search=${searchX}&orderBy=${orderBy}&sortBy=${selectedValue}`,
    );
  };

  return (
    <Menu>
      <MenuTrigger>
        <Button className="ring-1 ring-zinc-800">
          Sort
          {sortBy === SORT_ORDER.asc ? <SortAsc size={16} /> : null}
          {sortBy === SORT_ORDER.desc ? <SortDesc size={16} /> : null}
        </Button>
      </MenuTrigger>

      <MenuContent>
        {itemsForSort?.length > 0
          ? itemsForSort.map((item) => (
              <Button
                key={item.value}
                className={cn('text-left w-full justify-start duration-0', {
                  'bg-transparent hover:bg-zinc-700': sortBy !== item.value,
                })}
                size="sm"
                color={sortBy === item.value ? 'warning' : 'default'}
                onClick={() => handleSelected(item.value as typeof value)}
              >
                {item.label}
              </Button>
            ))
          : null}
      </MenuContent>
    </Menu>
  );
};
