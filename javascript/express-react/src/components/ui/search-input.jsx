import React from "react";
import { useDebouncedValue, useDidUpdate } from "@mantine/hooks";
import { CommandIcon, SearchIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn, useGlobalKeyBinding, getUrlWithParams } from "@lib";

export function SearchInput({ value, page, orderBy, sortBy }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const searchInputRef = React.useRef(null);
  const [search, setSearch] = React.useState(value);
  const [debouncedSearch] = useDebouncedValue(search, 1000); // 1s debounce

  // Listen for Cmd+K to focus on search input
  useGlobalKeyBinding({
    blockInputEl: false,
    cmd: true,
    preventDefault: false,
    keyBindings: {
      k: () => {
        if (searchInputRef?.current) {
          searchInputRef?.current?.focus();
        }
      },
    },
  });

  useDidUpdate(() => {
    if (debouncedSearch !== undefined && value !== debouncedSearch) {
      const searchX =
        (typeof debouncedSearch === "string" &&
          debouncedSearch === "undefined") ||
        !debouncedSearch
          ? ""
          : debouncedSearch;
      navigate(
        getUrlWithParams(pathname, {
          orderBy,
          sortBy,
          search: searchX,
        })
      );
      searchInputRef?.current?.focus();
    }
  }, [debouncedSearch, page, pathname, value, orderBy, sortBy]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setSearch("");
    }
    if (event.key === "ArrowLeft" && event.metaKey) {
      navigate(-1);
    }
    if (event.key === "ArrowRight" && event.metaKey) {
      navigate(1);
    }
    if (event.key === "Enter" && search !== undefined) {
      const searchX =
        (typeof debouncedSearch === "string" &&
          debouncedSearch === "undefined") ||
        !debouncedSearch
          ? ""
          : debouncedSearch;

      navigate(
        getUrlWithParams(pathname, {
          orderBy,
          sortBy,
          search: searchX,
        })
      );
    }
  };

  const handleOnFocus = (event) => {
    if (search !== undefined && search.length > 0) {
      event.currentTarget.select();
    }
  };

  return (
    <div
      className={cn(
        "w-full h-10 px-4 py-0 text-base border font-normal border-zinc-800 rounded-md",
        "focus-within:outline-none focus-within:ring-1 focus-within:ring-zinc-500 focus-within:border-transparent",
        "bg-zinc-900 text-zinc-200",
        "duration-200 ease-in-out transition-all group",
        "flex flex-row items-center flex-nowrap gap-x-2"
      )}
    >
      <SearchIcon className="w-6 h-6 inline-block text-zinc-700 group-focus-within:text-zinc-600" />
      <input
        ref={searchInputRef}
        name="search"
        value={search || ""}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        placeholder="Search"
        spellCheck={false}
        autoFocus={false}
        autoComplete="off"
        className="flex-1 bg-transparent h-full py-0 px-0
                  ring-0 border-none z-10 focus:outline-none
                  focus:ring-0 focus:border-0 select-all"
      />
      <kbd
        className="outline-none border rounded-md py-1 px-2 leading-none text-sm select-none
          transition-all duration-300 ease-in-out bg-zinc-950 text-zinc-200 
          border-zinc-700 group-focus-within:text-zinc-400"
      >
        <span
          className="font-mono flex flex-row flex-nowrap items-center
            justify-center text-current"
        >
          <CommandIcon className="w-3.5 h-3.5 inline-block mr-1" />K
        </span>
      </kbd>
      {!!search ? (
        <kbd
          className="outline-none border rounded-md py-1 px-2 leading-none text-sm select-none
            transition-all duration-300 ease-in-out
            bg-red-950/30 hover:bg-red-700/30 text-red-500 border-red-700/75
            focus-visible:ring-red-500"
        >
          <span
            className="font-mono flex flex-row flex-nowrap items-center
              justify-center text-current"
          >
            Esc
          </span>
        </kbd>
      ) : null}
    </div>
  );
}
