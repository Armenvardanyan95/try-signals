import { Observable } from 'rxjs';
import { signal, Signal, inject, DestroyRef } from '@angular/core';

export function toSignal<T>(source$: Observable<T>, initialValue: T): Signal<T> {
  const sig = signal(initialValue);
  const destroy = inject(DestroyRef);
  const sub = source$.subscribe((notif) => sig.set(notif));
  destroy.onDestroy(() => sub.unsubscribe());
  return sig;
}
