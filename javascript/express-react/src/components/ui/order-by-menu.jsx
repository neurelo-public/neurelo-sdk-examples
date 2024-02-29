import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Menu, MenuContent, MenuTrigger } from "./menu";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from ".";
import { getUrlWithParams, cn } from "@lib";

export const OrderByMenu = ({
  defaultValue,
  search,
  page,
  items,
  sortBy,
  value,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [orderBy, setOrderBy] = useState(value || defaultValue);

  const handleSelected = (selectedValue) => {
    setOrderBy(selectedValue);
    const searchX =
      (typeof search === "string" && search === "undefined") || !search
        ? ""
        : search;

    navigate(
      getUrlWithParams(pathname, {
        orderBy: selectedValue,
        sortBy,
        page,
        search: searchX,
      })
    );
  };

  return (
    <Menu>
      <MenuTrigger>
        <Button size="sm" className="ring-1 ring-zinc-800">
          Order By
          <ArrowUpDown size={16} />
        </Button>
      </MenuTrigger>

      <MenuContent>
        {items?.length > 0
          ? items.map((item) => (
              <Button
                key={item.value}
                className={cn("text-left w-full justify-start duration-0", {
                  "bg-transparent hover:bg-zinc-700 border-none":
                    orderBy !== item.value,
                })}
                size="sm"
                color={orderBy === item.value ? "warning" : "default"}
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
