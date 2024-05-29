import { neureloConfig } from 'neurelo-sdk';

export type GenericFetchError = { message: string; code: string } | null;
export type GenericResponse = unknown | null;

export const useFetch = async <T extends GenericResponse>({
  path,
  queryParams,
  options = {},
}: {
  path: string;
  queryParams?: Record<string, any>;
  options?: RequestInit;
}): Promise<[T, GenericFetchError]> => {
  try {
    const searchParams = new URLSearchParams(queryParams);
    const url = new URL(`${neureloConfig.basePath}${path}`);
    url.search = searchParams.toString();

    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env?.NEURELO_API_KEY || '',
      },
      ...options,
    }).then((data) => data.json());

    return [res?.data?.cursor?.firstBatch as T, null];
  } catch (err: unknown) {
    return [null as T, err as GenericFetchError];
  }
};
