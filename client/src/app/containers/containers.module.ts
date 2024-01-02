import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionsComponent } from './transactions/transactions.component';
import { ChartOfAccountsComponent } from './chart-of-accounts/chart-of-accounts.component';
import { ToIdPipe } from '../pipes/to-id.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [ChartOfAccountsComponent, TransactionsComponent, LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToIdPipe,
        NgSelectModule
    ]
})
export class ContainersModule { }
