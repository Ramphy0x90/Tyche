import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import $ from 'jquery';
import { selectUserIsLogged } from './store/selectors/user.selector';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: string = 'Tyche';
    userLogged: boolean = false;

    constructor(private readonly store: Store) { }

    ngOnInit(): void {
        this.store.select(selectUserIsLogged).subscribe((userLogged) => {
            this.userLogged = userLogged;
        });
    }
}
