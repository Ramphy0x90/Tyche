import { Component, OnInit } from '@angular/core';
import { from, mergeMap, take, toArray } from 'rxjs';
import { Account } from 'src/app/models/account';
import { ChartOfAccountsService } from 'src/app/services/chart-of-accounts.service';
import _ from "lodash";
import Modal from 'bootstrap/js/dist/modal';
import { AccountCreate } from 'src/app/models/account.create';
import { Store } from '@ngrx/store';
import { app } from 'src/app/store/actions/app.action';
import { selectAppMode } from 'src/app/store/selectors/app.selector';
import { AppStateMode } from 'src/app/store/reducers/app.reducer';

@Component({
    selector: 'app-chart-of-accounts',
    templateUrl: './chart-of-accounts.component.html',
    styleUrl: './chart-of-accounts.component.css'
})
export class ChartOfAccountsComponent implements OnInit {
    appMode?: AppStateMode;

    accounts: Account[] = [];
    accountsPackages: string[] = [];
    accountsByType: { type: string, accounts: Account[] }[] = [];
    tableColumns: { name: string, label: string }[] = [
        { name: "code", label: "Codice" },
        { name: "subType", label: "Sotto tipo" },
        { name: "group", label: "Gruppo" },
        { name: "description", label: "Descizione" },
        { name: "notes", label: "Note" }
    ];

    accountTemp: AccountCreate = {
        type: "",
        subType: "",
        group: "",
        description: "",
        notes: "",
        code: 0,
        sign: 1,
        accountsPackage: ""
    };

    formModel: AccountCreate | Account = this.accountTemp;

    selectedAccounts: string[] = [];
    _selectedPackage?: string;

    get selectedPackage(): string {
        return this._selectedPackage || "";
    }

    set selectedPackage(accountsPackage: string) {
        this._selectedPackage = accountsPackage;
        this.loadAccounts();
    }

    constructor(
        private readonly store: Store,
        private chartOfAccountsService: ChartOfAccountsService
    ) { }

    ngOnInit(): void {
        this.loadAccountsPackages();
        this.loadAccounts();

        this.store.select(selectAppMode).subscribe((appMode) => {
            this.appMode = appMode;
        });
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
                this.accountsPackages = packages;
                this.selectedPackage = this.accountsPackages?.[0] || "";
            })
    }

    groupAccountsBy(field: string): void {
        this.accountsByType = _.map(
            _.groupBy(this.accounts, field),
            (accounts, type) => ({
                type,
                accounts
            })
        );
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

    createAccount(): void {
        this.store.dispatch(app.onCreate());
        this.formModel = { ...this.accountTemp };
        this.formModel.accountsPackage = this.selectedPackage;

        const editAccountsModal = new Modal('#accountModal', {});
        editAccountsModal.toggle();
    }

    editAccount(): void {
        this.store.dispatch(app.onEdit());
        this.formModel = { ...this.accounts.find((account) => account.id == this.selectedAccounts[0])! };

        const editAccountsModal = new Modal('#accountModal', {});
        editAccountsModal.toggle();
    }

    cancelEdit(): void {
        this.store.dispatch(app.onView());
        this.selectedAccounts = [];
    }

    saveAccount(): void {
        if (this.appMode?.onCreate) {
            this.chartOfAccountsService.create(this.formModel)
                .pipe(take(1))
                .subscribe(() => {
                    this.loadAccounts();
                });
        }

        if (this.appMode?.onEdit) {
            this.chartOfAccountsService.update(<Account>this.formModel)
                .pipe(take(1))
                .subscribe((account) => {
                    const accountIndex = this.accounts.findIndex((account) => account.id == this.selectedAccounts[0]);
                    const typeIndex = this.accountsByType.findIndex((typeGroup) => {
                        return typeGroup["type"] == this.accounts[accountIndex]["type"]
                    });

                    const accountIndexInTypeGroup = this.accountsByType[typeIndex].accounts.findIndex((account) => account.id == this.selectedAccounts[0])
                    this.accountsByType[typeIndex].accounts[accountIndexInTypeGroup] = account;
                    this.accounts[accountIndex] = account;
                    this.selectedAccounts = [];

                });
        }

        this.store.dispatch(app.onView());
    }

    deleteAccount(): void {
        from(this.selectedAccounts).pipe(
            mergeMap(accountId => this.chartOfAccountsService.delete(accountId)),
            toArray()
        ).subscribe(() => {
            this.selectedAccounts = [];
            this.loadAccounts();
        });
    }
}
