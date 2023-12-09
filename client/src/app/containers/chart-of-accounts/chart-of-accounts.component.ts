import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Account } from 'src/app/models/account';
import { ChartOfAccountsService } from 'src/app/services/chart-of-accounts.service';
import _ from "lodash";
import { ToIdPipe } from 'src/app/pipes/to-id.pipe';

@Component({
    selector: 'app-chart-of-accounts',
    standalone: true,
    imports: [ToIdPipe],
    templateUrl: './chart-of-accounts.component.html',
    styleUrl: './chart-of-accounts.component.css'
})
export class ChartOfAccountsComponent implements OnInit {
    accounts: Account[] = [];
    accountsPackages: string[] = [];
    accountsByType: { type: string, accounts: Account[] }[] = [];
    tableColumns: { name: string, label: string }[] = [
        { name: "code", label: "Codice" },
        { name: "subType", label: "Sotto tipo" },
        { name: "group", label: "Gruppo" },
        { name: "description", label: "Descizione" },
        { name: "notes", label: "Note" }
    ]

    selectedAccounts: string[] = [];
    _selectedPackage?: string;

    get selectedPackage(): string {
        return this._selectedPackage || "";
    }

    set selectedPackage(accountsPackage: string) {
        this._selectedPackage = accountsPackage;
        this.loadAccounts();
    }

    constructor(private chartOfAccountsService: ChartOfAccountsService) { }

    ngOnInit(): void {
        this.loadAccountsPackages();
        this.loadAccounts();
    }

    loadAccounts(): void {
        this.selectedPackage && this.chartOfAccountsService.getAll(this.selectedPackage)
            .pipe(take(1))
            .subscribe((accounts) => {
                this.accounts = accounts;
                this.groupAccountsBy("type");
            })
    }

    loadAccountsExample(): void {
        this.chartOfAccountsService.getAccountsExample()
            .pipe(take(1))
            .subscribe((accounts) => {
                this.accounts = accounts;
                this.groupAccountsBy("type");
            })
    }

    loadAccountsPackages(): void {
        this.chartOfAccountsService.getPackages()
            .pipe(take(1))
            .subscribe((packages) => {
                console.log("packages loaded")
                this.accountsPackages = packages;
                this.selectedPackage = this.accountsPackages?.[0] || "";
            })
    }

    groupAccountsBy(field: string): void {
        this.accountsByType = _.map(_.groupBy(this.accounts, field), (accounts, type) => ({
            type,
            accounts
        }));
    }

    selectAccount(account: Account): void {
        if (!this.isAccountSelected(account)) {
            this.selectedAccounts.push(account.id);
        } else {
            const index = this.selectedAccounts.indexOf(account.id);
            this.selectedAccounts.splice(index, 1);
        }
    }

    isAccountSelected(account: Account): boolean {
        return this.selectedAccounts.includes(account.id);
    }
}
