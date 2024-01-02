import { FilmForm } from '@/components/films/film-form';
import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { FilmApiService, FilmUpdateInput } from 'neurelo-sdk';

const getOneFilm = async ({ searchParams: { filmId } }: { searchParams: { filmId: string } }) => {
  try {
    const res = await FilmApiService.findFilmById(filmId);

    return {
      data: res.data?.data,
    };
  } catch (error) {
    console.error(`Error fetching film ${filmId}`, error);
    return {
      data: undefined,
    };
  }
};

const updateFilm = async ({ filmId, ...props }: FilmUpdateInput & { filmId: number }) => {
  'use server';

  try {
    const res = await FilmApiService.updateFilmById(String(filmId), props);

    return {
      data: res.data?.data,
    };
  } catch (error) {
    const {
      response: {
        data: { errors },
      },
    } = error as { response: { data: { errors: string[] } } };
    console.error(`Error updating film ${filmId}`, errors);

    return {
      data: undefined,
    };
  }
};

export default async function FilmDetailPage({
  params: { filmId },
}: {
  params: { filmId: string };
}) {
  // Fetch data from external API
  const { data: film } = await getOneFilm({
    searchParams: {
      filmId,
    },
  });

  return (
    <Page>
      <PageTitle title={`Detail for: ${filmId}`} />

      <div className="grid grid-cols-1">
        {film ? (
          <FilmForm
            film={film}
            updateFilm={updateFilm}
          />
        ) : null}
      </div>
    </Page>
  );
}
