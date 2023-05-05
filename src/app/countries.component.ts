import { JsonPipe, NgFor } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CountriesService } from './countries.service';

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
  allCountries = toSignal(this.countriesService.getCountries(), { initialValue: []});
  countries = computed(() => {
    return this.allCountries().filter(
      c => c.name.common.toLowerCase().includes(this.query().toLowerCase()),
    );
  })
}
