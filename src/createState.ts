import type { Dispatch, StateCache } from './types';

export const stateCache = new Map<string | number, StateCache<any>>();

export function createState<T>(
  initialValue: T | (() => T),
  stateId: string | number,
): [() => T, Dispatch<T>] {
  if (!stateCache.has(stateId)) {
    const value = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
    stateCache.set(stateId, { value, listeners: new Set() });
  }

  const cached = stateCache.get(stateId) as StateCache<T>;

  const setState: Dispatch<T> = (action) => {
    const newValue =
      typeof action === 'function' ? (action as (prev: T) => T)(cached.value) : action;

    if (!Object.is(cached.value, newValue)) {
      cached.value = newValue;

      cached.listeners.forEach((listener) => listener(newValue));
    }
  };

  return [() => cached.value, setState];
}

export function subscribeToState<T>(id: string | number, callback: (value: T) => void): () => void {
  const cached = stateCache.get(id) as StateCache<T> | undefined;

  if (!cached) {
    throw new Error(`State with id "${id}" does not exist. Call createState first.`);
  }

  cached.listeners.add(callback);
  return () => cached.listeners.delete(callback);
}
