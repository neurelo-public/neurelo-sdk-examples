import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Pagination } from '@/components/page-level/pagination';
import SearchInput from '@/components/ui/search-input';
import { formatDate, formatTimeShort } from '@/lib/date-helper';
import { useFetch } from '@/lib/hooks';
import { LocalActor } from '@/types/actor';
import { SORT_ORDER, SortOrder } from '@/types/generic';

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

export default async function CustomListActorsPage({
  searchParams: { page, search, orderBy: initialOrderBy, sortBy: initialSortBy },
}: {
  searchParams: { page: string; search: string; orderBy?: string; sortBy?: SortOrder };
}) {
  const orderBy = initialOrderBy || 'actor_id';
  const pageNum = Number.isInteger(Number(page)) ? Number(page) : 1;
  const sortBy = initialSortBy || SORT_ORDER.asc;

  const [data] = await useFetch<LocalActor[]>({
    path: '/custom/FindActorsCaseI',
    queryParams: {
      limit: PAGE_SIZE,
      offset: (pageNum - 1) * PAGE_SIZE,
      first_name: `%${search || ''}%`,
      first_name2: `%${search || ''}%`,
      last_name: `%${search || ''}%`,
      last_name2: `%${search || ''}%`,
    },
  });

  return (
    <Page>
      <PageTitle title="Custom Query" />

      <SearchInput
        value={search}
        page={pageNum}
        orderBy={orderBy}
        sortBy={sortBy}
      />

      <Pagination<LocalActor>
        page={pageNum}
        search={search}
        data={data}
        pageSize={PAGE_SIZE}
        orderBy={orderBy}
        sortBy={sortBy}
        itemsForOrderBy={itemsForOrderBy}
        orderByDefaultValue="actor_id"
        totalCount={data?.[0]?.total_count || 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data !== undefined && data?.length > 0
          ? data.map((actor) => (
              <div
                key={actor.actor_id}
                className="p-4 rounded-lg bg-zinc-900 text-zinc-200
            ring-1 ring-zinc-800 hover:bg-zinc-800 hover:ring-zinc-700">
                <h2 className="text-xl font-medium w-full text-ellipsis text-zinc-300">
                  {actor?.first_name || 'No first name'} {actor?.last_name || 'No last name'}
                </h2>

                <p className="text-sm font-normal mt-1 line-clamp-3 text-zinc-500">
                  {!!actor?.last_update
                    ? `${formatDate(actor.last_update)} ${formatTimeShort(actor.last_update)}`
                    : null}
                </p>
              </div>
            ))
          : null}
      </div>

      <Pagination
        page={pageNum}
        search={search}
        data={data}
        pageSize={PAGE_SIZE}
        orderBy={orderBy}
        sortBy={sortBy}
        className="pb-16"
        itemsForOrderBy={itemsForOrderBy}
        orderByDefaultValue="actor_id"
        totalCount={data?.[0]?.total_count || 0}
      />
    </Page>
  );
}
