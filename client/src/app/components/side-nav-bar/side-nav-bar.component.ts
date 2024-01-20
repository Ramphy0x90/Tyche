import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UserRestricted } from 'src/app/models/user.restricted';
import { UserService } from 'src/app/services/user.service';
import { selectUserState } from 'src/app/store/selectors/user.selector';
import { NavBarOption } from 'src/app/types/nav-bar-option';

@Component({
    selector: 'app-side-nav-bar',
    standalone: true,
    imports: [CommonModule, AppRoutingModule],
    templateUrl: './side-nav-bar.component.html',
    styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent implements OnInit {
    readonly navOptions: NavBarOption[] = [
        {
            name: "Home",
            label: "Home",
            route: "home",
            icon: "bi bi-house"
        },
        {
            name: "Transactions",
            label: "Transazioni",
            route: "transactions",
            icon: "bi bi-cash-stack"
        },
        {
            name: "Chart of accounts",
            label: "Piano dei conti",
            route: "chart-of-accounts",
            icon: "bi bi-pie-chart"
        }
    ];

    loggedUser?: UserRestricted;

    constructor(
        private readonly store: Store,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.store.select(selectUserState).subscribe((userState) => {
            this.loggedUser = userState.user;
        });
    }

    logout(): void {
        this.userService.logout();
        this.router.navigate(["login"]);
    }
}
