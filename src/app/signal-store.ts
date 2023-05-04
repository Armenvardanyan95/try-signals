import { WritableSignal, Signal, signal } from "@angular/core";

type StoreDefinition<
  StateKey extends string,
  ComputedKey extends string,
  State extends Record<StateKey, WritableSignal<any>>
> = {
  state: State;
  computed?: (signals: State) => Record<ComputedKey, Signal<any>>;
};

function createStore<
  StateKey extends string,
  ComputedKey extends string,
  State extends Record<StateKey, any>
>(definition: StoreDefinition<StateKey, ComputedKey, State>) {
  const { state, computed } = definition;
  return {
    ...state,
    ...computed?.(state),
  };
}

const countStore = createStore({
  state: {
    count: signal(0),
  },
  // computed: ({ count }) => ({
  //   double: computed(() => count() * 2),
  // }),
});
