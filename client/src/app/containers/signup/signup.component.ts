import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { UserSignup } from 'src/app/models/user-signup';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/store/actions/user.actions';
import { selectUserIsLogged } from 'src/app/store/selectors/user.selector';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})
export class SignupComponent {
    signupForm: UserSignup = {
        name: "",
        surname: "",
        email: "",
        password: ""
    }

    constructor(
        private readonly store: Store,
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.store.select(selectUserIsLogged)
            .subscribe((userLogged) => {
                if (userLogged) {
                    this.router.navigate(["home"]);
                }
            });
    }

    signup(): void {
        this.userService.signup(this.signupForm)
            .pipe(take(1))
            .subscribe((response) => {
                this.store.dispatch(user.created());
                this.router.navigate(["login"]);
                this.toastr.success("User created successfully");
            });
    }
}
