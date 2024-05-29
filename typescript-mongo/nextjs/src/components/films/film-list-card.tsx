import { formatCurrencyString } from '@/lib';
import { Film } from 'neurelo-sdk';
import Link from 'next/link';

export const FilmListCard = ({ film }: { film: Film }) => {
  return (
    <Link
      key={film.title}
      href={`/list-films/${film.id}`}
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
              {film.rentalRate ? formatCurrencyString(film.rentalRate) : '--'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
