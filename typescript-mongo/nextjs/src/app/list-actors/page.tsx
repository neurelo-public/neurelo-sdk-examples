import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Pagination } from '@/components/page-level/pagination';
import SearchInput from '@/components/ui/search-input';
import { formatDate } from '@/lib';
import { ITEMS_ORDER_BY } from '@/types/actor';
import { GenericError, SORT_ORDER, SortOrder } from '@/types/generic';
import { Actor, ActorApiService, ActorOrderByWithAggregationInput } from 'neurelo-sdk';

const PAGE_SIZE = 32;

const getAllActors = async ({
  pageNum,
  search,
  orderBy,
}: {
  pageNum: number;
  search: string;
  orderBy: ActorOrderByWithAggregationInput;
}) => {
  try {
    const res = await ActorApiService.findActor(
      undefined,
      {
        OR: [
          {
            firstName: {
              contains: search,
            },
          },
          {
            lastName: {
              contains: search,
            },
          },
        ],
      },
      [orderBy],
      (pageNum - 1) * PAGE_SIZE,
      PAGE_SIZE,
    );

    const resForTotal = await ActorApiService.aggregateByActor(
      { _count: ['id'] },
      {
        OR: [
          {
            firstName: {
              contains: search,
            },
          },
          {
            lastName: {
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
      totalCount: resForTotal?.data?.data?._count?.id || 0,
    };
  } catch (error) {
    console.error('Error fetching actors from server : ', {
      error,
      errorMessage: (error as GenericError)?.response?.data?.errors,
    });
    return {
      data: [],
      totalCount: 0,
    };
  }
};

export default async function ListActorsPage({
  searchParams: { page, search, orderBy: initialOrderBy, sortBy: initialSortBy },
}: {
  searchParams: { page: string; search: string; orderBy?: string; sortBy?: SortOrder };
}) {
  const orderBy = initialOrderBy || 'id';
  const pageNum = Number.isInteger(Number(page)) ? Number(page) : 1;
  const sortBy = initialSortBy || SORT_ORDER.asc;

  // Fetch data from external API
  const { data, totalCount } = await getAllActors({
    orderBy: { [orderBy]: sortBy },
    pageNum,
    search: search ? search.trim() : '',
  });

  return (
    <Page>
      <PageTitle title="Actor list" />

      <SearchInput
        value={search}
        page={pageNum}
        orderBy={orderBy}
        sortBy={sortBy}
      />

      <Pagination<Actor>
        page={pageNum}
        search={search}
        data={data}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        itemsForOrderBy={ITEMS_ORDER_BY}
        showOrderBy
        orderByDefaultValue="id"
        orderBy={orderBy}
        sortBy={sortBy}
        showSortBy
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data !== undefined && data?.length > 0
          ? data.map((actor) => (
              <div
                key={actor.id}
                className="p-4 rounded-lg bg-zinc-900 text-zinc-200
                  ring-1 ring-zinc-800 hover:bg-zinc-800 hover:ring-zinc-700">
                <h2 className="text-xl font-medium w-full text-ellipsis text-zinc-300">
                  {actor?.firstName || '--'} {actor?.lastName || '--'}
                </h2>

                <p className="text-sm font-normal mt-1 line-clamp-3 text-zinc-500">
                  {actor.lastUpdate ? formatDate(actor.lastUpdate) : '--- --, ----'}
                </p>
              </div>
            ))
          : null}
      </div>

      <Pagination<Actor>
        page={pageNum}
        search={search}
        data={data}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        className="pb-16"
        orderBy={orderBy}
        orderByDefaultValue="id"
        sortBy={sortBy}
      />
    </Page>
  );
}
