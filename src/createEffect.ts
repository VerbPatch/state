import type { DependencyList, EffectCache, EffectCallback } from './types';
import { haveDepsChanged } from './util';

export const effectCache = new Map<string | number, EffectCache>();

export function createEffect(
  effect: EffectCallback,
  deps: DependencyList | undefined,
  effectId: string | number,
): void {
  const cached = effectCache.get(effectId);

  const shouldRun = !cached || haveDepsChanged(cached.deps, deps);

  if (shouldRun) {
    if (cached?.cleanup) {
      cached.cleanup();
    }

    const cleanup = effect();

    effectCache.set(effectId, { cleanup: cleanup || undefined, deps });
  }
}

export function cleanupAllEffects(): void {
  effectCache.forEach((cached) => {
    if (cached.cleanup) {
      cached.cleanup();
    }
  });
  effectCache.clear();
}

export function cleanupEffect(id: string | number): void {
  const cached = effectCache.get(id);
  if (cached?.cleanup) {
    cached.cleanup();
  }
  effectCache.delete(id);
}
