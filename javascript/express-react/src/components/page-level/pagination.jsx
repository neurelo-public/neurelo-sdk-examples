import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { cn, getUrlWithParams } from "@lib";
import { SortMenu, OrderByMenu, Button, Divider } from "@components/ui";
import { CodeBlockTrigger } from "@components/generic";

export function Pagination({
  search,
  page,
  pageSize,
  className = "",
  sortBy,
  orderBy,
  data = undefined,
  totalCount: initialTotalCount = undefined,
  showOrderBy = false,
  showSortBy = false,
  itemsForOrderBy = [{ label: "Loading...", value: undefined }],
  orderByDefaultValue = undefined,
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const totalCountFromData = useMemo(() => {
    if (data && data?.length > 0) {
      const newData = data?.[0];
      return newData?.total_count || 0;
    }
    return 0;
  }, [data]);

  const totalCount = useMemo(
    () =>
      initialTotalCount !== undefined ? initialTotalCount : totalCountFromData,
    [initialTotalCount, totalCountFromData]
  );

  const total = useMemo(
    () => (data && data?.length > 0 ? totalCount : 0),
    [data, totalCount]
  );

  const totalPages = useMemo(() => {
    if (data && data?.length > 0) {
      return Math.ceil(total / pageSize);
    }
    return 0;
  }, [data, pageSize, total]);

  const handlePageChange = (pageL) => {
    const searchX =
      (typeof search === "string" && search === "undefined") || !search
        ? ""
        : search;
    navigate(
      getUrlWithParams(pathname, {
        orderBy,
        sortBy,
        page: pageL,
        search: searchX,
      })
    );
  };

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div>
        <p className="text-zinc-300 font-normal text-sm">
          {data && data?.length > 0
            ? `Showing ${page} of ${totalPages}`
            : "No results"}
        </p>
        <p className="text-zinc-500 font-normal text-xs flex flex-row items-center">
          Total Results:
          <span className="text-zinc-300 ml-1 font-medium">
            {total || "--"}
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        {data && data?.length > 0 ? (
          <CodeBlockTrigger json={data} title="View Json" />
        ) : null}

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
            size="sm"
          >
            Prev
          </Button>

          <Divider orientation="vertical" className="bg-zinc-800" />

          <div
            className="bg-zinc-900 text-zinc-100 font-bold h-full w-12 text-center leading-none
            flex items-center justify-center"
          >
            <span className="w-12">{page}</span>
          </div>

          <Divider orientation="vertical" className="bg-zinc-800" />

          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || totalPages === 0}
            className="rounded-none rounded-r-md"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
