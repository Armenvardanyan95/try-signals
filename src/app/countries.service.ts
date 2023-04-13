import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

type Country = {
    name: {
        common: string;
    };
    capital?: string[];
};

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    private readonly http = inject(HttpClient);

    getCountries() {
        return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
    }
}