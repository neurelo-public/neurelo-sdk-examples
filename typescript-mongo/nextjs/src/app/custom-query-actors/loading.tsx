import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Loading() {
  return (
    <Page>
      <PageTitle title="Custom Query Actors (Case-Insensitive Search)" />

      <div className="w-full">
        <Skeleton className="w-full h-10" />
      </div>

      <div className="w-full h-12 flex items-center justify-between">
        <Skeleton className="w-28 h-12" />
        <div className="gap-x-2 flex">
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-44 h-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array(32)
          .fill(0)
          .map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-20 rounded-lg">
              <span className="sr-only">Loading...</span>
            </Skeleton>
          ))}
      </div>

      <div className="w-full h-12 flex items-center justify-between mt-5 pb-16">
        <Skeleton className="w-28 h-12" />
        <div className="gap-x-2 flex">
          <Skeleton className="w-32 h-10" />
          <Skeleton className="w-44 h-10" />
        </div>
      </div>
    </Page>
  );
}
