import { DependencyList } from './types';

export function haveDepsChanged(
  prevDeps: DependencyList | undefined,
  nextDeps: DependencyList | undefined,
): boolean {
  if (!prevDeps || !nextDeps) return true;
  if (prevDeps.length !== nextDeps.length) return true;

  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return true;
    }
  }

  return false;
}
