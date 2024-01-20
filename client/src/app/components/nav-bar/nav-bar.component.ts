import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavBarOption } from 'src/app/types/nav-bar-option';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule, AppRoutingModule],
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    readonly navOptions: NavBarOption[] = [
        {
            name: "Login",
            label: "Login",
            route: "login"
        },
        {
            name: "Signup",
            label: "Registra",
            route: "signup",
        }
    ];
}
