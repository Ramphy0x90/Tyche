import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/store/actions/user.actions';
import { selectUserIsLogged } from 'src/app/store/selectors/user.selector';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    loginForm: UserLogin = {
        email: "",
        password: ""
    }

    constructor(
        private readonly store: Store,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.store.select(selectUserIsLogged)
            .subscribe((userLogged) => {
                if (userLogged) {
                    this.router.navigate(["home"]);
                }
            });
    }

    login(): void {
        this.userService.login(this.loginForm)
            .pipe(take(1))
            .subscribe((response) => {
                this.store.dispatch(user.loggedIn(response));
                this.router.navigate(["home"]);
            });
    }
}
