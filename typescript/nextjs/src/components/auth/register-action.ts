'use server';

import { GenericError, SafeError } from '@/types/generic';
import { Auth, AuthApiService } from 'neurelo-sdk';
import * as uuid from 'uuid';
import bcrypt from "bcrypt";
import { RegistrationForm } from './register-dialog';
import { SALT_ROUNDS } from '@/lib';

export type SafeReturn = Auth;

export async function registerServerSubmit(
  data: RegistrationForm,
): Promise<[SafeReturn | undefined, SafeError | undefined]> {
  try {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const res = await AuthApiService.createOneAuth({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: uuid.v4(),
    });

    if (res.status === 201 || res.status === 200) {
      return [res.data?.data, undefined];
    }
    return [undefined, { message: 'Error creating account' }];
  } catch (error) {
    const errorToReturn =
      (error as GenericError)?.response?.data?.errors?.[0]?.error || (error as SafeError)?.message;
    console.error('Error creating account : ', {
      error,
      errorMessage: errorToReturn,
    });
    return [undefined, { message: errorToReturn }];
  }
}
