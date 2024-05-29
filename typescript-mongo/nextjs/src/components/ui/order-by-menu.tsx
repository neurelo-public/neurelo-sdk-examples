import { cn } from '@/lib';
import { OrderByItem, SortOrder } from '@/types/generic';
import { ArrowUpDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './button';
import { Menu, MenuContent, MenuTrigger } from './menu';

export const OrderByMenu = ({
  defaultValue,
  search,
  page,
  items,
  sortBy,
  value,
}: {
  defaultValue?: string;
  search: string;
  page: number;
  items: OrderByItem[];
  sortBy: SortOrder;
  value?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [orderBy, setOrderBy] = useState(value || defaultValue);

  const handleSelected = (selectedValue: string) => {
    setOrderBy(selectedValue);
    const searchX = (typeof search === 'string' && search === 'undefined') || !search ? '' : search;
    router.push(
      `${pathname}?page=${page}&search=${searchX}&orderBy=${selectedValue}&sortBy=${sortBy}`,
    );
  };

  return (
    <Menu>
      <MenuTrigger>
        <Button className="ring-1 ring-zinc-800">
          Order By
          <ArrowUpDown size={16} />
        </Button>
      </MenuTrigger>

      <MenuContent>
        {items?.length > 0
          ? items.map((item) => (
              <Button
                key={item.value}
                className={cn('text-left w-full justify-start duration-0', {
                  'bg-transparent hover:bg-zinc-700': orderBy !== item.value,
                })}
                size="sm"
                color={orderBy === item.value ? 'warning' : 'default'}
                onClick={() => handleSelected(item.value as string)}>
                {item.label}
              </Button>
            ))
          : null}
      </MenuContent>
    </Menu>
  );
};
