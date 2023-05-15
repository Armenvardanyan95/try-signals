import { Signal, signal } from "@angular/core";

type StoreMetadata<
  StateKey extends string,
  State extends Record<StateKey, any>
> = {
  initialState: State;
};

// export function createSignalStore<
//   StateKey extends string,
//   State extends Record<StateKey, any>
// >({ initialState }: StoreMetadata<StateKey, State>) {
//   const state = {} as any;

//   for (const key in initialState) {
//     state[key as unknown as StateKey] = signal(initialState[key]);
//   }

//   return state as {
//     [K in StateKey]: Signal<State[K]>;
//   };
// }

// Specify the return type of createSignalStore
type SignalStore<
  State extends Record<string, any>
> = {
  [K in keyof State]: Signal<State[K]>;
};

// Use the SignalStore type as the return type of createSignalStore
export function createSignalStore<
  State extends Record<string, any>
>({
  initialState,
}: StoreMetadata<string, State>) {
  const state = {} as any;

  for (const key in initialState) {
    state[key] = signal(initialState[key]);
  }

  return state as SignalStore<State>;
}

type Wrapper<T> = {wrapped: T};

type Wrap<T extends Record<string, any>> = {
  [K in keyof T]: Wrapper<T[K]>;
}

const wrapped: Wrap<{count: number}> = {
  count: {wrapped: 0}
}

wrapped.count.wrapped = 1;