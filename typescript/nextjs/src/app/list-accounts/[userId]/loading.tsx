import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Loading() {
  return (
    <Page>
      <PageTitle title="Detail for: ---" />

      <Skeleton className="w-full h-[26rem]" />
    </Page>
  );
}
