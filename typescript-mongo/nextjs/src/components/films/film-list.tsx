import { Film } from 'neurelo-sdk';
import { Tooltip } from '../ui/tooltip';
import { FilmListCard } from './film-list-card';

const CLICK_HERE_TEXT = 'Click here to open details page.';

export async function FilmList({ data }: { data: Film[] }) {
  return data !== undefined && data?.length > 0
    ? data.map((film) => (
        <Tooltip
          key={film.title}
          content={CLICK_HERE_TEXT}
          delayDuration={0}
          showArrow
        >
          <FilmListCard film={film} />
        </Tooltip>
      ))
    : null;
}
