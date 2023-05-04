import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { Routes, provideRouter } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { CountriesComponent } from "./app/countries.component";
import { ToDoListComponent } from "./app/to-do-list.component";
import { FormComponent } from "./app/form.component";

const routes = [
  { path: "", component: CountriesComponent, pathMatch: "full" },
  { path: "todos", component: ToDoListComponent },
  { path: 'form', component: FormComponent },
] satisfies Routes;
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
});