import type { CallbackCache, DependencyList } from './types';
import { haveDepsChanged } from './util';

export const callbackCache = new Map<string | number, CallbackCache<any>>();

export function createCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  callbackId: string | number,
): T {
  const cached = callbackCache.get(callbackId) as CallbackCache<T> | undefined;

  if (!cached || haveDepsChanged(cached.deps, deps)) {
    callbackCache.set(callbackId, { callback, deps });
    return callback;
  }

  return cached.callback;
}
