import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Pagination } from '@/components/page-level/pagination';
import SearchInput from '@/components/ui/search-input';
import { formatCurrency, getRegexForSearch } from '@/lib';
import { useFetch } from '@/lib/hooks';
import { AggregateFilmsCustomQuery, ITEMS_ORDER_BY } from '@/types/film';
import { SORT_ORDER, SortOrder } from '@/types/generic';
import { Film } from 'neurelo-sdk';

const PAGE_SIZE = 32;

const FIND_FILMS_CASE_INSENSITIVE = '/custom/findFilmsCaseInsensitive';
const AGG_FILMS_CASE_INSENSITIVE = '/custom/aggFilmsCaseInsensitive';

type FindFilmsCustomQuery = Film & {
  lastUpdate: { $date: string };
  rentalRate: { $numberDecimal: number };
};

export default async function CustomListFilmsPage({
  searchParams: { page, search, orderBy: initialOrderBy, sortBy: initialSortBy },
}: {
  searchParams: { page: string; search: string; orderBy?: string; sortBy?: SortOrder };
}) {
  const orderBy = initialOrderBy || 'id';
  const pageNum = Number.isInteger(Number(page)) ? Number(page) : 1;
  const sortBy = initialSortBy || SORT_ORDER.asc;

  const [dataFind] = await useFetch<FindFilmsCustomQuery[]>({
    path: FIND_FILMS_CASE_INSENSITIVE,
    queryParams: {
      limit: PAGE_SIZE,
      skip: (pageNum - 1) * PAGE_SIZE,
      title: getRegexForSearch(search),
      description: getRegexForSearch(search),
    },
  });

  const [dataAggregate] = await useFetch<AggregateFilmsCustomQuery>({
    path: AGG_FILMS_CASE_INSENSITIVE,
    queryParams: {
      title: getRegexForSearch(search),
      description: getRegexForSearch(search),
    },
  });

  const totalCount = dataAggregate?.[0]?.totalCount ?? 0;

  return (
    <Page>
      <PageTitle title="Custom Query Films (Case-Insensitive Search)" />

      <SearchInput
        value={search}
        page={pageNum}
        orderBy={orderBy}
        sortBy={sortBy}
      />

      <Pagination<Film>
        page={pageNum}
        search={search}
        data={dataFind}
        pageSize={PAGE_SIZE}
        orderBy={orderBy}
        sortBy={sortBy}
        itemsForOrderBy={ITEMS_ORDER_BY}
        orderByDefaultValue="id"
        totalCount={totalCount}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {dataFind !== undefined && dataFind?.length > 0
          ? dataFind.map((film) => (
              <div
                key={film.title}
                className="flex items-stretch justify-stretch rounded-lg bg-zinc-900 text-zinc-200
              ring-1 ring-zinc-800 hover:bg-zinc-800 hover:ring-zinc-700
              focus-visible:outline-none focus-visible:ring-zinc-600">
                <div className="p-4 flex flex-col justify-between">
                  <div className="w-full">
                    <h2 className="text-lg font-medium w-full text-ellipsis text-zinc-300">
                      {film.title || 'No title'}
                    </h2>

                    <div className="text-sm font-normal mt-1 line-clamp-3 text-zinc-500">
                      {film.description || 'No description'}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-2 text-sm leading-none mt-3">
                    <span className="py-1 px-2 rounded-full bg-sky-950 border border-sky-600 text-sky-300">
                      {film.releaseYear}
                    </span>
                    <div className="py-1 px-2 rounded-full text-sky-200 flex flex-row items-end gap-x-2 gap-y-0">
                      <span className="text-lg font-semibold text-zinc-500 group-hover:text-zinc-700">
                        {film?.rentalRate?.$numberDecimal
                          ? formatCurrency(film.rentalRate.$numberDecimal)
                          : '--'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      <Pagination
        page={pageNum}
        search={search}
        data={dataFind}
        pageSize={PAGE_SIZE}
        orderBy={orderBy}
        sortBy={sortBy}
        className="pb-16"
        orderByDefaultValue="id"
        totalCount={totalCount}
      />
    </Page>
  );
}
