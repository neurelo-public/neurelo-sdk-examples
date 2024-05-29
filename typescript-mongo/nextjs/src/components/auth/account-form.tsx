'use client';

import { formatDate, formatTimeShort } from '@/lib';
import { useRegister } from '@/lib/hooks/auth';
import { useStore } from '@/lib/hooks/useStore';
import { Auth, AuthUpdateInput } from 'neurelo-sdk';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '../ui/button';
import { FormField } from '../ui/form-field';
import { SafeAuth } from './login-action';

export const AccountForm = ({
  user,
  updateAccount,
}: {
  user: Auth;
  updateAccount: ({
    userId,
    ...props
  }: AuthUpdateInput & {
    userId: string;
  }) => Promise<
    | {
        data: Auth;
      }
    | {
        data: undefined;
      }
  >;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const store = useStore<SafeAuth>({ key: 'auth', storeType: 'local' });

  const onSubmit = async (data: { name?: string }) => {
    setIsLoading(true);
    if (user.user_id === undefined || data.name === undefined) return;

    const accountDetails = {
      ...user,
      updated_at: new Date().toISOString(),
      userId: user.user_id,
      name: data?.name || user?.name,
    };

    await updateAccount(accountDetails);

    if (accountDetails.email === store.value?.email) {
      store.set({
        email: accountDetails.email,
        name: accountDetails.name,
        user_id: accountDetails.user_id,
        created_at: accountDetails.created_at,
        updated_at: accountDetails.updated_at,
        deleted_at: accountDetails?.deleted_at,
      });
    }

    setIsLoading(false);
    window.location.href = '/list-accounts';
  };

  const { control, handleSubmit, errors } = useRegister({
    defaultValues: {
      name: user.name,
      email: user.email,
      password: 'secret-password',
    },
    onSubmit(data) {
      console.log('Submitted : ', data);
    },
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 rounded-lg bg-zinc-950 text-zinc-200
                ring-1 ring-zinc-800 flex flex-col gap-y-2">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <FormField
              label="Name"
              size="md"
              errors={errors.name && errors.name?.message}
              inputProps={{
                type: 'text',
                placeholder: 'Full name',
                ...field,
              }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          disabled
          render={({ field }) => (
            <FormField
              label="Email"
              size="md"
              errors={errors.email && errors.email?.message}
              inputProps={{
                type: 'text',
                placeholder: 'Email address',
                ...field,
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          disabled
          render={({ field }) => (
            <FormField
              label="Password"
              size="md"
              errors={errors.password && errors.password?.message}
              inputProps={{
                type: 'password',
                placeholder: '************',
                ...field,
              }}
            />
          )}
        />

        <div className="w-full flex items-center justify-end mt-6">
          <Button
            type="submit"
            size="lg"
            color="primary"
            className="bg-sky-500/30"
            isLoading={isLoading}>
            Update
          </Button>
        </div>
      </form>
      <div className="flex flex-row items-center justify-between gap-2 text-sm leading-none mt-3">
        <p className="text-zinc-500 gap-2 flex items-center">
          Created at :
          <span className="text-sky-600">
            {user.created_at ? formatDate(user.created_at) : '--- --, ----'}
          </span>
          -
          <span className="text-sky-800">
            {user.created_at ? formatTimeShort(user.created_at) : '--'}
          </span>
        </p>
        <p className="text-zinc-500 gap-2 flex items-center">
          Updated at :
          <span className="text-sky-600">
            {user.updated_at ? formatDate(user.updated_at) : '--- --, ----'}
          </span>
          -
          <span className="text-sky-800">
            {user.updated_at ? formatTimeShort(user.updated_at) : '--'}
          </span>
        </p>
      </div>
    </>
  );
};
