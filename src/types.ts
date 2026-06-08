export type SetStateAction<T> = T | ((prev: T) => T);
export type Dispatch<T> = (action: SetStateAction<T>) => void;
export type EffectCallback = () => void | (() => void);
export type DependencyList = readonly any[];

export interface StateCache<T> {
  value: T;
  listeners: Set<(value: T) => void>;
}

export interface EffectCache {
  cleanup?: () => void;
  deps: DependencyList | undefined;
}

export interface CallbackCache<T extends (...args: any[]) => any> {
  callback: T;
  deps: DependencyList;
}

export interface MemoCache<T> {
  value: T;
  deps: DependencyList;
}
