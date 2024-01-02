import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Pagination } from '@/components/page-level/pagination';
import SearchInput from '@/components/ui/search-input';
import { GenericError, SORT_ORDER, SortOrder } from '@/types/generic';
import { Actor, ActorApiService, ActorOrderByWithAggregationInput } from 'neurelo-sdk';

const PAGE_SIZE = 32;

const itemsForOrderBy = [
  {
    label: 'Actor id',
    value: 'actor_id',
  },
  {
    label: 'First name',
    value: 'first_name',
  },
  {
    label: 'Last name',
    value: 'last_name',
  },
  {
    label: 'Last update',
    value: 'last_update',
  },
];

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
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
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
      { _count: ['actor_id'] },
      {
        OR: [
          {
            first_name: {
              contains: search,
            },
          },
          {
            last_name: {
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
      totalCount: resForTotal?.data?.data?._count?.actor_id || 0,
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
  const orderBy = initialOrderBy || 'actor_id';
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
        itemsForOrderBy={itemsForOrderBy}
        showOrderBy
        orderByDefaultValue="actor_id"
        orderBy={orderBy}
        sortBy={sortBy}
        showSortBy
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data !== undefined && data?.length > 0
          ? data.map((actor) => (
              <div
                key={actor.actor_id}
                className="p-4 rounded-lg bg-zinc-900 text-zinc-200
                  ring-1 ring-zinc-800 hover:bg-zinc-800 hover:ring-zinc-700"
              >
                <h2 className="text-xl font-medium w-full text-ellipsis text-zinc-300">
                  {actor?.first_name || '--'} {actor?.last_name || '--'}
                </h2>

                <p className="text-sm font-normal mt-1 line-clamp-3 text-zinc-500">
                  {actor?.last_update || '--'}
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
        orderByDefaultValue="actor_id"
        sortBy={sortBy}
      />
    </Page>
  );
}
