import { callbackCache } from './createCallback';
import { effectCache } from './createEffect';
import { memoCache } from './createMemo';
import { stateCache } from './createState';

export * from './createCallback';
export * from './createEffect';
export * from './createMemo';
export * from './createState';
export * from './types';

export function clearAllCaches(): void {
  stateCache.clear();
  effectCache.clear();
  callbackCache.clear();
  memoCache.clear();
}
