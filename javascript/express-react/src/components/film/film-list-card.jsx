import { Link } from "react-router-dom";

export function FilmListCard({ film }) {
  return (
    <Link
      key={film.title}
      to={`/film/${film.film_id}`}
      className="flex items-stretch justify-stretch rounded-lg bg-zinc-950 text-zinc-200
        ring-1 ring-zinc-800 hover:bg-zinc-800 hover:ring-zinc-700
        focus-visible:outline-none focus-visible:ring-zinc-600"
    >
      <div className="p-4">
        <h2 className="text-2xl font-medium w-full text-ellipsis text-zinc-200">
          {film.title || "No title"}
        </h2>

        <div className="text-sm font-normal mt-1 line-clamp-3 text-zinc-400">
          {film.description || "No description"}
        </div>

        <div className="flex flex-row items-center justify-between gap-2 text-sm leading-none mt-3">
          <span className="py-1 px-2 rounded-full bg-sky-950 border border-sky-600 text-sky-300">
            {film.release_year}
          </span>
          <div className="py-1 px-2 rounded-full text-sky-200 flex flex-row items-end gap-x-2 gap-y-0">
            <span className="text-lg text-zinc-600 group-hover:text-zinc-700">
              $
            </span>
            <span className="text-2xl font-semibold text-zinc-500 group-hover:text-zinc-700">
              {film.rental_rate}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
