import type { DependencyList, MemoCache } from './types';
import { haveDepsChanged } from './util';

export const memoCache = new Map<string | number, MemoCache<any>>();

export function createMemo<T>(factory: () => T, deps: DependencyList, memoId: string | number): T {
  const cached = memoCache.get(memoId) as MemoCache<T> | undefined;

  if (!cached || haveDepsChanged(cached.deps, deps)) {
    const value = factory();
    memoCache.set(memoId, { value, deps });
    return value;
  }

  return cached.value;
}
