import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from, mergeMap, take, toArray } from 'rxjs';
import { AccountRestricted } from 'src/app/models/account.restricted';
import { Transaction } from 'src/app/models/transaction';
import { TransactionRestricted } from 'src/app/models/transaction.restricted';
import { ChartOfAccountsService } from 'src/app/services/chart-of-accounts.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { app } from 'src/app/store/actions/app.action';
import { AppStateMode } from 'src/app/store/reducers/app.reducer';
import { selectAppMode } from 'src/app/store/selectors/app.selector';
import _ from 'lodash';

interface TableColumn {
    name: string,
    label: string,
    format?: string
}

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
    appMode?: AppStateMode;

    tableColumns: TableColumn[] = [
        { name: "account", label: "Conto" },
        { name: "value", label: "Valore" },
        { name: "notes", label: "Note" },
        { name: "executionDate", label: "Data esecuzione", format: "date" }
    ];

    transactionTemp: TransactionRestricted = {
        account: undefined,
        value: 0,
        notes: "",
        isExecuted: false
    };

    formModel: TransactionRestricted | Transaction = this.transactionTemp;

    sortingBy: TableColumn = this.tableColumns.find((column) => column.name == "executionDate")!;
    orderingBy: "asc" | "desc" = "desc";

    transactions: Transaction[] = [];
    accountsPackages: string[] = [];
    accounts: AccountRestricted[] = [];

    selectedTransactions: string[] = [];
    _selectedPackage: string = "";

    get selectedPackage(): string | null {
        return this._selectedPackage || null;
    }

    set selectedPackage(accountsPackage: string) {
        this._selectedPackage = accountsPackage;

        if (this._selectedPackage) {
            this.loadRestrictedAccounts();
        } else {
            this.accounts = [];
        }
    }

    constructor(
        private readonly store: Store,
        private transactionsService: TransactionsService,
        private chartOfAccountsService: ChartOfAccountsService
    ) { }

    ngOnInit(): void {
        this.loadAccountsPackages();
        this.loadTransactions();

        this.store.select(selectAppMode).subscribe((appMode) => {
            this.appMode = appMode;
        });
    }

    loadTransactions(): void {
        this.transactionsService.getAll()
            .pipe(take(1))
            .subscribe((transactions) => {
                this.transactions = transactions;
            })
    }

    loadAccountsPackages(): void {
        this.chartOfAccountsService.getPackages()
            .pipe(take(1))
            .subscribe((packages) => {
                this.accountsPackages = packages;
            })
    }

    loadRestrictedAccounts(): void {
        this.selectedPackage && this.chartOfAccountsService.getAllRestricted(this.selectedPackage)
            .pipe(take(1))
            .subscribe((accounts) => {
                this.accounts = accounts
            });
    }

    sortTable(column: TableColumn, order: "asc" | "desc" = this.orderingBy): void {
        this.sortingBy = column;
        this.transactions = _.orderBy(
            this.transactions,
            (tableColumn) => {

                if (column.name == "account") {
                    return tableColumn.account["description"];
                } else if (column.name == "value") {
                    return tableColumn.value * tableColumn.account?.sign;
                }

                return tableColumn[column.name];
            },
            [order]
        );
    }

    selectTransaction(transaction: Transaction): void {
        if (!this.isTransactionSelected(transaction)) {
            this.selectedTransactions.push(transaction.id);
        } else {
            const index = this.selectedTransactions.indexOf(transaction.id);
            this.selectedTransactions.splice(index, 1);
        }
    }

    isTransactionSelected(transaction: Transaction): boolean {
        return this.selectedTransactions.includes(transaction.id);
    }

    createTransaction(): void {
        this.store.dispatch(app.onCreate());
        this.formModel = { ...this.transactionTemp };
        this.selectedPackage = "";
    }

    editTransaction(): void {
        this.store.dispatch(app.onEdit());
        this.formModel = { ...this.transactions.find((transaction) => transaction.id == this.selectedTransactions[0])! };
        this.selectedPackage = this.formModel.account?.accountsPackage || this.selectedPackage || "";

    }

    cancelEdit(): void {
        this.store.dispatch(app.onView());
        this.selectedTransactions = [];
    }

    saveTransaction(): void {
        if (this.appMode?.onCreate) {
            this.transactionsService.create(this.formModel)
                .pipe(take(1))
                .subscribe((transaction) => {
                    transaction && this.loadTransactions();
                });
        }

        if (this.appMode?.onEdit) {
            this.transactionsService.update(<Transaction>this.formModel)
                .pipe(take(1))
                .subscribe((updatedTransaction) => {
                    const transactionIndex = this.transactions.findIndex((transaction) => transaction.id == updatedTransaction.id);
                    this.transactions[transactionIndex] = updatedTransaction;
                });
        }

        this.selectedTransactions = [];
        this.store.dispatch(app.onView());
    }

    deleteTransaction(): void {
        from(this.selectedTransactions).pipe(
            mergeMap(transactionId => this.transactionsService.delete(transactionId)),
            toArray()
        ).subscribe(() => {
            this.selectedTransactions = [];
            this.loadTransactions();
        });
    }
}
