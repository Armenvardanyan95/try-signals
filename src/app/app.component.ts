import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

function toSignal<T>(source$ : Observable<T>, initialValue: T): Signal<T> {
  const sig = signal(initialValue);
  source$.subscribe(notif => sig.set(notif));
  return sig;
}

@Component({
  selector: "app-root",
  template: `
    <h1>Try Signals</h1>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {}
