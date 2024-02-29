import { SortAscIcon, SortDescIcon } from "lucide-react";
import { useState } from "react";
import { Menu, MenuContent, MenuTrigger } from "./menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from ".";
import { SORT_ORDER, cn, getUrlWithParams } from "@lib";

const SORT_TEXT = {
  [SORT_ORDER.asc]: "Ascending",
  [SORT_ORDER.desc]: "Descending",
};

const itemsForSort = [
  {
    value: SORT_ORDER.asc,
    label: SORT_TEXT[SORT_ORDER.asc],
  },
  {
    value: SORT_ORDER.desc,
    label: SORT_TEXT[SORT_ORDER.desc],
  },
];

export const SortMenu = ({ search, page, orderBy, value }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sortBy, setSort] = useState(value);

  const handleSelected = (selectedValue) => {
    setSort(selectedValue);
    const searchX =
      (typeof search === "string" && typeof search === "undefined") ||
      (!search ? "" : search);
    navigate(
      getUrlWithParams(pathname, {
        orderBy,
        sortBy: selectedValue,
        page,
        search: searchX,
      })
    );
  };

  return (
    <Menu>
      <MenuTrigger>
        <Button size="sm" className="ring-1 ring-zinc-800">
          Sort
          {sortBy === SORT_ORDER.asc ? <SortAscIcon size={16} /> : null}
          {sortBy === SORT_ORDER.desc ? <SortDescIcon size={16} /> : null}
        </Button>
      </MenuTrigger>

      <MenuContent>
        {itemsForSort?.length > 0
          ? itemsForSort.map((item) => (
              <Button
                key={item.value}
                className={cn("text-left w-full justify-start duration-0", {
                  "bg-transparent hover:bg-zinc-700 border-none":
                    sortBy !== item.value,
                })}
                size="sm"
                color={sortBy === item.value ? "warning" : "default"}
                onClick={() => handleSelected(item.value)}
              >
                {item.label}
              </Button>
            ))
          : null}
      </MenuContent>
    </Menu>
  );
};
