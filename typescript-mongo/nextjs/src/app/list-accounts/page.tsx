import { AccountList } from '@/components/auth/account-list';
import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Pagination } from '@/components/page-level/pagination';
import { PreventAccess } from '@/components/ui/prevent-access';
import SearchInput from '@/components/ui/search-input';
import { Skeleton } from '@/components/ui/skeleton';
import { ITEMS_ORDER_BY } from '@/types/account';
import { GenericError, SORT_ORDER, SortOrder } from '@/types/generic';
import { Auth, AuthApiService, AuthOrderByWithRelationInput } from 'neurelo-sdk';
import { Suspense } from 'react';

const PAGE_SIZE = 16;

const getAllAccounts = async ({
  pageNum,
  search,
  orderBy,
}: {
  pageNum: number;
  search: string;
  orderBy: AuthOrderByWithRelationInput;
}) => {
  try {
    const res = await AuthApiService.findAuth(
      undefined,
      {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      },
      [orderBy],
      (pageNum - 1) * PAGE_SIZE,
      PAGE_SIZE,
    );

    const resForTotal = await AuthApiService.aggregateByAuth(
      { _count: ['user_id'] },
      {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      },
      undefined,
      0,
      undefined,
    );

    return {
      data: res.data?.data || [],
      totalCount: resForTotal.data?.data?._count?.user_id || 0,
    };
  } catch (error) {
    console.error('Error fetching accounts from server : ', {
      error,
      errorMessage: JSON.stringify((error as GenericError)?.response?.data?.errors),
    });
    return {
      data: [],
      totalCount: 0,
    };
  }
};

export default async function ListAccountsPage({
  searchParams: { page, search, orderBy: initialOrderBy, sortBy: initialSortBy },
}: {
  searchParams: { page: string; search: string; orderBy?: string; sortBy?: SortOrder };
}) {
  const orderBy = initialOrderBy || 'user_id';
  const pageNum = Number.isInteger(Number(page)) ? Number(page) : 1;
  const sortBy = initialSortBy || SORT_ORDER.asc;

  const { data, totalCount } = await getAllAccounts({
    orderBy: { [orderBy]: sortBy },
    pageNum,
    search: search ? search.trim() : '',
  });

  return (
    <Page>
      <PageTitle title="Account list" />

      <PreventAccess>
        <SearchInput
          value={search}
          page={pageNum}
          orderBy={orderBy}
          sortBy={sortBy}
        />

        <Pagination<Auth>
          page={pageNum}
          search={search}
          data={data}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          orderBy={orderBy}
          showOrderBy
          itemsForOrderBy={ITEMS_ORDER_BY}
          orderByDefaultValue="user_id"
          sortBy={sortBy}
          showSortBy
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Suspense
            fallback={Array(16)
              .fill(0)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full h-44 rounded-lg">
                  <span className="sr-only">Loading...</span>
                </Skeleton>
              ))}>
            <AccountList data={data} />
          </Suspense>
        </div>

        <Pagination<Auth>
          page={pageNum}
          search={search}
          data={data}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          className="pb-16"
          orderBy={orderBy}
          orderByDefaultValue="user_id"
          sortBy={sortBy}
        />
      </PreventAccess>
    </Page>
  );
}
