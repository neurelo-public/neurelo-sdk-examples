'use client';

import { Film, FilmUpdateInput } from 'neurelo-sdk';
import { FormEventHandler, useState } from 'react';
import { Button } from '../ui/button';
import { FormField } from '../ui/form-field';

export const FilmForm = ({
  film,
  updateFilm,
}: {
  film: Film;
  updateFilm: ({
    filmId,
    ...props
  }: FilmUpdateInput & {
    filmId: number;
  }) => Promise<
    | {
        data: Film;
      }
    | {
        data: undefined;
      }
  >;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (film.film_id === undefined) return;

    const formData = new FormData(event.currentTarget);
    const jsonData = Object.fromEntries(formData.entries());

    await updateFilm({
      filmId: film.film_id,
      ...jsonData,
    });
    setIsLoading(false);
    window.location.href = '/list-films';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-lg bg-zinc-950 text-zinc-200
              ring-1 ring-zinc-800 flex flex-col gap-y-2"
    >
      <FormField
        label="Film Id"
        inputProps={{
          ref: null,
          name: 'filmId',
          placeholder: 'No Film Id',
          value: film.film_id,
          type: 'text',
          disabled: true,
          required: true,
        }}
      />

      <FormField
        label="Title"
        inputProps={{
          ref: null,
          name: 'title',
          placeholder: 'No Title',
          defaultValue: film.title,
          type: 'text',
          required: true,
        }}
      />

      <FormField
        label="Description"
        inputProps={{
          ref: null,
          name: 'description',
          placeholder: 'Description',
          defaultValue: film.description,
          type: 'text',
          required: true,
        }}
      />

      <FormField
        label="Rental Rate"
        inputProps={{
          ref: null,
          name: 'rental_rate',
          placeholder: '---',
          defaultValue: film.rental_rate,
          type: 'number',
          required: true,
        }}
      />

      <div className="flex flex-row items-center justify-between gap-2 text-sm leading-none mt-3">
        <span className="py-1 px-2 rounded-full bg-sky-950 border border-sky-600 text-sky-300">
          {film.release_year}
        </span>
      </div>

      <div className="flex flex-row items-center justify-between gap-2 text-sm leading-none mt-3">
        <span className="py-1 px-2 rounded-full bg-zinc-900 border border-zinc-600 text-zinc-300">
          Duration: {film.length} Mins
        </span>
        <div className="py-1 px-2 rounded-full text-sky-200 flex flex-row items-end gap-x-2 gap-y-0">
          <span className="text-lg text-zinc-600 group-hover:text-zinc-700">{film.rating}</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-end gap-2">
        <Button
          type="submit"
          size="lg"
          color="primary"
          className="bg-sky-500/30"
          isLoading={isLoading}
        >
          Update
        </Button>
      </div>
    </form>
  );
};
