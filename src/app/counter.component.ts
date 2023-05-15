import { Component, WritableSignal, signal } from "@angular/core";
import { createSignalStore } from "./signal-store";

const counterStore = createSignalStore({
  initialState: {
    count: 0,
  },
});

function createSignals<T extends Record<string, any>>(initialValues: T) {
    const signals = {} as any;

    for (const key in initialValues) {
      signals[key] = signal(initialValues[key]);
    }

    return signals as {[K in keyof typeof initialValues]: WritableSignal<typeof initialValues[K]>};
}


@Component({
    selector: "app-counter",
    template: `
        <p>Current count: {{ counter.count() }}</p>
    `,
    standalone: true,
})
export class CounterComponent {
    vm = createSignals({
        items: [],
    });
}