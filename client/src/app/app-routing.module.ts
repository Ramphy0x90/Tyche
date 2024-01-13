import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { TransactionsComponent } from './containers/transactions/transactions.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { ChartOfAccountsComponent } from './containers/chart-of-accounts/chart-of-accounts.component';
import { LoginComponent } from './containers/login/login.component';
import { SignupComponent } from './containers/signup/signup.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "login" },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "home", component: HomeComponent, canActivate: [authGuard] },
    { path: "transactions", component: TransactionsComponent, canActivate: [authGuard] },
    { path: "reports", component: ReportsComponent, canActivate: [authGuard] },
    { path: "chart-of-accounts", component: ChartOfAccountsComponent, canActivate: [authGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
