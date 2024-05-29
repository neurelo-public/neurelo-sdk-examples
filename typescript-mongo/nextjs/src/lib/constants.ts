export const SALT_ROUNDS = 10;

export function getRegexForSearch(search: string) {
  return `.*${search || ''}.*` as const;
}
