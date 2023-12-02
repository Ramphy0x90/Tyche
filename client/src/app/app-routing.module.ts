import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { TransactionsComponent } from './containers/transactions/transactions.component';
import { ReportsComponent } from './containers/reports/reports.component';
import { ChartOfAccountsComponent } from './containers/chart-of-accounts/chart-of-accounts.component';

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "login" },
    { path: "home", component: HomeComponent },
    { path: "transactions", component: TransactionsComponent },
    { path: "reports", component: ReportsComponent },
    { path: "chart-of-accounts", component: ChartOfAccountsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
