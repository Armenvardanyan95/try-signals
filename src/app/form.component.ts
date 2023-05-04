import { Component, Injectable, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { toSignal } from './to-signal';

type Permissions = 'client' | 'admin';

@Injectable({
    providedIn: 'root'
})
export class Store {
    permissions$ = new Subject<Record<Permissions, boolean>>();
}

@Component({
    selector: 'app-form',
    standalone: true,
    template: `
        <form [formGroup]="form">
            <input type="text" formControlName="name" placeholder="Enter your name" />
            <input type="checkbox" formControlName="isClient" placeholder="Client" />
            <button type="submit">Submit</button>
        </form>
    `,
    imports: [ReactiveFormsModule],
})
export class FormComponent {
    private readonly store = inject(Store);
    form = new FormGroup({
        name: new FormControl(''),
        isClient: new FormControl(false),
    });
    
    permissions = toSignal(this.store.permissions$, {admin: false, client: false});

    disableClientField = effect(() => {
        if (this.permissions().admin) {
            this.form.get('isClient')!.disable();
        }
    });

    constructor() {
       setTimeout(() => {
              this.store.permissions$.next({admin: true, client: false});
         }, 2_000);
    }

}