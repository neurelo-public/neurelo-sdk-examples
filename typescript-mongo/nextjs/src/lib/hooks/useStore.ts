'use client';

import { useCallback, useMemo } from 'react';

export const STORAGE_KEYS = {
  auth: 'auth',
} as const;

export const STORE_TYPES = {
  local: 'local',
  session: 'session',
} as const;

export type StoreType = keyof typeof STORE_TYPES;

function getStore(type: StoreType): Storage {
  switch (type) {
    case STORE_TYPES.local:
      return localStorage;
    case STORE_TYPES.session:
      return sessionStorage;
    default:
      return localStorage;
  }
}

export type UseStoreRT<T> = {
  get: () => T | undefined;
  set: (value: T) => void;
  remove: () => void;
  clear: () => void;
  value: T | undefined;
};

// const emptyReturn = {
//   get: () => undefined,
//   set: () => undefined,
//   remove: () => undefined,
//   clear: () => undefined,
// };

export function useStore<T>({
  key,
  storeType = STORE_TYPES.local,
}: {
  key: keyof typeof STORAGE_KEYS;
  storeType?: StoreType;
}): UseStoreRT<T> {
  const store = typeof window === 'undefined' ? undefined : getStore(storeType);

  const get = useCallback((): T | undefined => {
    const value = store?.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch (error) {
        return value as T;
      }
    }
    return undefined;
  }, [key, store]);

  function set(value: T) {
    if (typeof value === 'object') {
      store?.setItem(key, JSON.stringify(value));
    } else {
      store?.setItem(key, value as string);
    }
  }

  function remove(): void {
    store?.removeItem(key);
  }

  function clear(): void {
    store?.clear();
  }

  const computedValue = useMemo(() => get(), [get]);

  return {
    get,
    set,
    remove,
    clear,
    value: computedValue,
  };
}
