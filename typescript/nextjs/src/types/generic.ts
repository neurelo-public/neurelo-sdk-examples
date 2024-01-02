export const SORT_ORDER = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export type GenericError = { response: { data: { errors: [{ error: string }] } } };

export type SafeError = { message?: string };
