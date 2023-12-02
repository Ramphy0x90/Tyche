import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavBarOption } from 'src/app/types/nav-bar-option';

@Component({
    selector: 'app-side-nav-bar',
    standalone: true,
    imports: [CommonModule, AppRoutingModule],
    templateUrl: './side-nav-bar.component.html',
    styleUrl: './side-nav-bar.component.css'
})
export class SideNavBarComponent {
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
            name: "Reports",
            label: "Rapporti",
            route: "reports",
            icon: "bi bi-bar-chart-line"
        },
        {
            name: "Chart of accounts",
            label: "Piano dei conti",
            route: "chart-of-accounts",
            icon: "bi bi-pie-chart"
        }
    ]
}
