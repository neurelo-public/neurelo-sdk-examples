import { FilmList } from '@/components/films/film-list';
import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Pagination } from '@/components/page-level/pagination';
import SearchInput from '@/components/ui/search-input';
import { Skeleton } from '@/components/ui/skeleton';
import { GenericError, SORT_ORDER, SortOrder } from '@/types/generic';
import { Film, FilmApiService, FilmOrderByWithRelationInput } from 'neurelo-sdk';
import { Suspense } from 'react';

const PAGE_SIZE = 16;

const itemsForOrderBy = [
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'Film id',
    value: 'film_id',
  },
  {
    label: 'Last update',
    value: 'last_update',
  },
  {
    label: 'Length',
    value: 'length',
  },
  {
    label: 'Release year',
    value: 'release_year',
  },
  {
    label: 'Rental duration',
    value: 'rental_duration',
  },
  {
    label: 'Rental rate',
    value: 'rental_rate',
  },
  {
    label: 'Replacement cost',
    value: 'replacement_cost',
  },
  {
    label: 'Special features',
    value: 'special_features',
  },
  {
    label: 'Title',
    value: 'title',
  },
];

const getAllFilms = async ({
  pageNum,
  search,
  orderBy,
}: {
  pageNum: number;
  search: string;
  orderBy: FilmOrderByWithRelationInput;
}) => {
  try {
    const res = await FilmApiService.findFilm(
      undefined,
      {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
      [orderBy],
      (pageNum - 1) * PAGE_SIZE,
      PAGE_SIZE,
    );

    const resForTotal = await FilmApiService.aggregateByFilm(
      { _count: ['film_id'] },
      {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            description: {
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
      totalCount: resForTotal.data?.data?._count?.film_id || 0,
    };
  } catch (error) {
    console.error('Error fetching films from server : ', {
      error,
      errorMessage: (error as GenericError)?.response?.data?.errors,
    });
    return {
      data: [],
      totalCount: 0,
    };
  }
};

export default async function ListFilmsPage({
  searchParams: { page, search, orderBy: initialOrderBy, sortBy: initialSortBy },
}: {
  searchParams: { page: string; search: string; orderBy?: string; sortBy?: SortOrder };
}) {
  const orderBy = initialOrderBy || 'film_id';
  const pageNum = Number.isInteger(Number(page)) ? Number(page) : 1;
  const sortBy = initialSortBy || SORT_ORDER.asc;

  // Fetch data from external API
  const { data, totalCount } = await getAllFilms({
    orderBy: { [orderBy]: sortBy },
    pageNum,
    search: search ? search.trim() : '',
  });

  return (
    <Page>
      <PageTitle title="Film list" />

      <SearchInput
        value={search}
        page={pageNum}
        orderBy={orderBy}
        sortBy={sortBy}
      />

      <Pagination<Film>
        page={pageNum}
        search={search}
        data={data}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        orderBy={orderBy}
        showOrderBy
        itemsForOrderBy={itemsForOrderBy}
        orderByDefaultValue="film_id"
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
                className="w-full h-44 rounded-lg"
              >
                <span className="sr-only">Loading...</span>
              </Skeleton>
            ))}
        >
          <FilmList data={data} />
        </Suspense>
      </div>

      <Pagination<Film>
        page={pageNum}
        search={search}
        data={data}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        className="pb-16"
        orderBy={orderBy}
        orderByDefaultValue="film_id"
        sortBy={sortBy}
      />
    </Page>
  );
}
