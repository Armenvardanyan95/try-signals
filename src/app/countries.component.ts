import { JsonPipe, NgFor } from '@angular/common';
import { Component, Signal, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CountriesService } from './countries.service';

function toSignal<T>(source$ : Observable<T>, initialValue: T): Signal<T> {
  const sig = signal(initialValue);
  source$.subscribe(notif => sig.set(notif));
  return sig;
}

@Component({
  selector: 'app-countries',
  template: `
    <input placeholder="Search..." [ngModel]="query()" (ngModelChange)="query.set($event)"/>
    <a routerLink="/todos">Todos</a>
    <div *ngFor="let country of countries()" class="country">
      <h3>{{ country.name.common }}</h3>
      <h5>Capital: {{ country.capital?.[0] ?? 'N/A' }}</h5>
    </div>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  styles: [
    `
      .country {
        position: relative;
        border: solid 2px #ccc;
        padding: 10px;
        margin: 10px;
        width: 300px;
        border-radius: 5px;
      } 
    `
  ],
  imports: [RouterOutlet, JsonPipe, FormsModule, NgFor, RouterLink],
})
export class CountriesComponent {
  countriesService = inject(CountriesService);
  query = signal('');
  allCountries = toSignal(this.countriesService.getCountries(), []);
  countries = computed(() => {
    return this.allCountries().filter(
      c => c.name.common.toLowerCase().includes(this.query().toLowerCase()),
    );
  })
}
