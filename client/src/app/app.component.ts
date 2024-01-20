import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import $ from 'jquery';
import { selectUserIsLogged } from './store/selectors/user.selector';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { user } from './store/actions/user.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title: string = 'Tyche';
    userLogged: boolean = false;

    constructor(
        private readonly store: Store,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.checkIfUserIsLogged();

        this.store.select(selectUserIsLogged).subscribe((userLogged) => {
            this.userLogged = userLogged;
        });
    }

    checkIfUserIsLogged(): void {
        const userToken = localStorage.getItem("token");

        if (userToken) {
            this.userService.isTokenValid(userToken)
                .pipe(take(1))
                .subscribe((response) => {
                    if (response) {
                        this.store.dispatch(user.loggedIn(response));
                    } else {
                        this.store.dispatch(user.loggedOut());
                        this.router.navigate(["login"]);
                    }
                });
        }
    }
}
