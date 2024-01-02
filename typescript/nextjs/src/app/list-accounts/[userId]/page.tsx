import { AccountForm } from '@/components/auth/account-form';
import { Page } from '@/components/page-level/page';
import PageTitle from '@/components/page-level/page-title';
import { PreventAccess } from '@/components/ui/prevent-access';
import { AuthApiService, AuthUpdateInput } from 'neurelo-sdk';

const getOneUser = async ({ searchParams: { userId } }: { searchParams: { userId: string } }) => {
  try {
    const res = await AuthApiService.findAuthById(userId);

    return {
      data: res.data?.data,
    };
  } catch (error) {
    console.error(`Error fetching account ${userId}`, error);
    return {
      data: undefined,
    };
  }
};

const updateAccount = async ({ userId, ...props }: AuthUpdateInput & { userId: string }) => {
  'use server';

  try {
    const res = await AuthApiService.updateAuthById(userId, props);

    return {
      data: res.data?.data,
    };
  } catch (error) {
    const {
      response: {
        data: { errors },
      },
    } = error as { response: { data: { errors: string[] } } };
    console.error(`Error updating account ${userId}`, errors);

    return {
      data: undefined,
    };
  }
};

export default async function FilmDetailPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  // Fetch data from external API
  const { data: user } = await getOneUser({
    searchParams: {
      userId,
    },
  });

  return (
    <Page>
      <PageTitle title={`Detail for: ${userId}`} />

      <PreventAccess>
        {user ? (
          <div className="grid grid-cols-1">
            <AccountForm
              user={user}
              updateAccount={updateAccount}
            />
          </div>
        ) : null}
      </PreventAccess>
    </Page>
  );
}
