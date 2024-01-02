'use client';

import { cn } from '@/lib';
import { SortOrder } from '@/types/generic';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '../ui/button';
import { Divider } from '../ui/divider';
import { OrderByMenu } from '../ui/order-by-menu';
import { SortMenu } from '../ui/sort-menu';

export const Pagination = <T extends object>({
  search,
  page,
  pageSize,
  className = '',
  sortBy,
  orderBy,
  data = undefined,
  totalCount: initialTotalCount = undefined,
  showOrderBy = false,
  showSortBy = false,
  itemsForOrderBy = [{ label: 'Loading...', value: undefined }],
  orderByDefaultValue = undefined,
}: {
  search: string;
  page: number;
  pageSize: number;
  orderBy: string;
  sortBy: SortOrder;
  className?: string;
  data?: T[];
  totalCount?: number;
  showOrderBy?: boolean;
  showSortBy?: boolean;
  itemsForOrderBy?: { label?: string; value?: string }[];
  orderByDefaultValue?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const totalCountFromData = useMemo(() => {
    if (data && data?.length > 0) {
      const newData = data?.[0] as { total_count: number };
      return newData?.total_count || 0;
    }
    return 0;
  }, [data]);

  const totalCount = useMemo(
    () => (initialTotalCount !== undefined ? initialTotalCount : totalCountFromData),
    [initialTotalCount, totalCountFromData],
  );

  const total = useMemo(() => (data && data?.length > 0 ? totalCount : 0), [data, totalCount]);

  const totalPages = useMemo(() => {
    if (data && data?.length > 0) {
      return Math.ceil(total / pageSize);
    }
    return 0;
  }, [data, pageSize, total]);

  const handlePageChange = (page: number) => {
    const searchX = (typeof search === 'string' && search === 'undefined') || !search ? '' : search;
    router.push(`${pathname}?page=${page}&search=${searchX}&orderBy=${orderBy}&sortBy=${sortBy}`, {
      scroll: true,
    });
  };

  return (
    <div className={cn('flex justify-between items-center', className)}>
      <div>
        <p className="text-zinc-300 font-normal text-sm">
          {data && data?.length > 0 ? `Showing ${page} of ${totalPages}` : 'No results'}
        </p>
        <p className="text-zinc-500 font-normal text-xs flex flex-row items-center">
          Total Results:
          <span className="text-zinc-300 ml-1 font-medium">{total || '--'}</span>
        </p>
      </div>

      <div className="flex gap-4">
        {showOrderBy ? (
          <OrderByMenu
            defaultValue={orderByDefaultValue}
            search={search}
            value={orderBy}
            page={page}
            items={itemsForOrderBy}
            sortBy={sortBy}
          />
        ) : null}

        {showSortBy ? (
          <SortMenu
            orderBy={orderBy}
            page={page}
            search={search}
            value={sortBy}
          />
        ) : null}

        <div className="flex justify-center items-stretch rounded-md ring-1 ring-zinc-800">
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="rounded-none rounded-l-md"
          >
            Prev
          </Button>

          <Divider
            orientation="vertical"
            className="bg-zinc-800"
          />

          <div
            className="bg-zinc-900 text-zinc-100 font-bold h-full w-12 text-center leading-none
            flex items-center justify-center"
          >
            <span className="w-12">{page}</span>
          </div>

          <Divider
            orientation="vertical"
            className="bg-zinc-800"
          />

          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || totalPages === 0}
            className="rounded-none rounded-r-md"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
