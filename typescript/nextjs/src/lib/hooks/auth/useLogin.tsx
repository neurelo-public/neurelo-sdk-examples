import { useMemo } from 'react';
import { DefaultValues, Resolver, useForm } from 'react-hook-form';

type GenericDefaultValues = {
  email?: string;
  password?: string;
};

type GenericActive = {
  email?: boolean;
  password?: boolean;
};

export const useLogin = <T extends GenericDefaultValues>({
  onSubmit: onSubmitExternal,
  defaultValues: initialDefaultValues = {
    email: '',
    password: '',
  } as DefaultValues<T>,
  active = {
    email: true,
    password: true,
  },
  resolver,
}: {
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  active?: GenericActive;
  resolver?: Resolver<T, any> | undefined;
}) => {
  const defaultValues = useMemo<DefaultValues<T>>(
    () =>
      ({
        email: active?.email !== undefined ? initialDefaultValues.email : undefined,
        password: active?.password !== undefined ? initialDefaultValues.password : undefined,
      }) as DefaultValues<T>,
    [active, initialDefaultValues],
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<T>({
    defaultValues,
    mode: 'onSubmit',
    criteriaMode: 'firstError',
    shouldFocusError: true,
    resolver: resolver,
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: T) => {
    onSubmitExternal(data);
  };

  return {
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    reset,
  };
};
