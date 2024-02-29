import { useCallback, useEffect, useState } from "react";

import { FilmListCard } from "@components/film";
import { SORT_ORDER } from "@lib/constant";
import { PageTitle, Pagination } from "@components/page-level";
import { useSearchParams } from "react-router-dom";
import { getUrlWithParams } from "@lib";
import { LoadingSpinner, SearchInput } from "@components/ui";

const PAGE_SIZE = 20;

const itemsForOrderBy = [
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Film id",
    value: "film_id",
  },
  {
    label: "Last update",
    value: "last_update",
  },
  {
    label: "Length",
    value: "length",
  },
  {
    label: "Release year",
    value: "release_year",
  },
  {
    label: "Rental duration",
    value: "rental_duration",
  },
  {
    label: "Rental rate",
    value: "rental_rate",
  },
  {
    label: "Replacement cost",
    value: "replacement_cost",
  },
  {
    label: "Special features",
    value: "special_features",
  },
  {
    label: "Title",
    value: "title",
  },
];

async function getAllFilms(allParams = {}) {
  const url = getUrlWithParams("/api/film-list", allParams);

  const result = await fetch(url);
  return result.json();
}

export function FilmListPage() {
  const [allParams] = useSearchParams();

  const rawPageNum = Number.isInteger(Number(allParams.get("page")))
    ? Number(allParams.get("page"))
    : 1;

  const pageNum = rawPageNum > 0 ? rawPageNum : 1;
  const orderBy = allParams.get("orderBy") || "film_id";
  const sortBy = allParams.get("sortBy") || SORT_ORDER.asc;
  const search = allParams.get("search") ? allParams.get("search").trim() : "";

  const [filmList, setFilmList] = useState("");
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async function () {
      setIsLoading(true);
      const { data, totalCount } = await getAllFilms({
        pageNum,
        search,
        orderBy,
        sortBy,
      });
      setFilmList(data);
      setTotal(totalCount);
      setIsLoading(false);
    },
    [pageNum, search, orderBy, sortBy]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return filmList ? (
    <div className="w-full flex flex-col gap-4 py-3">
      <PageTitle title="Film list" />

      <SearchInput
        value={search}
        page={pageNum}
        orderBy={orderBy}
        sortBy={sortBy}
      />

      <Pagination
        page={pageNum}
        search={search}
        data={filmList}
        totalCount={total}
        pageSize={PAGE_SIZE}
        orderBy={orderBy}
        showOrderBy
        itemsForOrderBy={itemsForOrderBy}
        orderByDefaultValue="film_id"
        sortBy={sortBy}
        showSortBy
      />

      {!isLoading ? (
        <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2 md:px-0 py-4 place-content-start">
          {filmList.map((film) => (
            <FilmListCard film={film} key={film.film_id} />
          ))}
        </div>
      ) : (
        <LoadingSpinner className="flex-1 min-h-[calc(100vh-200px)]" />
      )}
    </div>
  ) : (
    <LoadingSpinner className="flex-1 min-h-[calc(100vh-200px)]" />
  );
}
