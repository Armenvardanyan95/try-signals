import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { Routes, provideRouter } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { CountriesComponent } from "./app/countries.component";
import { ToDoListComponent } from "./app/to-do-list.component";

const routes = [
  { path: "", component: CountriesComponent, pathMatch: "full" },
  { path: "todos", component: ToDoListComponent },
] satisfies Routes;
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
});