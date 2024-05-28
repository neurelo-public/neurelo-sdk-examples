'use server';

import { GenericError, SafeError } from '@/types/generic';
import { Auth, AuthApiService } from 'neurelo-sdk';
import bcrypt from "bcrypt";

import { LoginForm } from './login-dialog';

export type SafeAuth = Omit<Auth, 'password'>;

export async function loginServerSubmit(
  data: LoginForm,
): Promise<[SafeAuth | undefined, SafeError | undefined]> {
  try {
    const res = await AuthApiService.findAuthByEmail(data.email);
    const userData = res.data?.data;

    if (res.status === 200 && userData && userData?.password) {
      if (String(userData?.deleted_at) !== 'null') {
        return [undefined, { message: 'Account has been deleted' }];
      }

      // Check password
      const isPasswordMatch = await bcrypt.compare(data.password, userData.password);
      if (!isPasswordMatch) {
        return [undefined, { message: 'Invalid password' }];
      }

      const usablePayload = {
        user_id: userData.user_id,
        name: userData.name,
        email: userData.email,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
      };

      return [usablePayload, undefined];
    }

    return [undefined, { message: 'Error during user login' }];
  } catch (error) {
    const errorToReturn =
      (error as GenericError)?.response?.data?.errors?.[0]?.error || (error as SafeError)?.message;
    console.error('Error signing in account : ', {
      error,
      errorMessage: errorToReturn,
    });
    return [undefined, { message: errorToReturn }];
  }
}
