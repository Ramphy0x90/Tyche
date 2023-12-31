import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Account } from '../models/account';
import { AccountRestricted } from '../models/account.restricted';
import { AccountCreate } from '../models/account.create';

@Injectable({
    providedIn: 'root'
})
export class ChartOfAccountsService {
    private readonly API_URI = "api/v1/chart-of-accounts";

    constructor(private httpClient: HttpClient) { }

    getAll(accountsPackage: string, from: number = 0, limit: number = -1): Observable<Account[]> {
        return this.httpClient.get<Account[]>(
            `${environment.server}/${this.API_URI}/all/${accountsPackage}`
        );
    }

    getAllRestricted(accountsPackage: string, from: number = 0, limit: number = -1): Observable<AccountRestricted[]> {
        return this.httpClient.get<AccountRestricted[]>(
            `${environment.server}/${this.API_URI}/all/restricted/${accountsPackage}`
        );
    }

    getById(id: string): Observable<Account> {
        return this.httpClient.get<Account>(
            `${environment.server}/${this.API_URI}/${id}`
        );
    }

    getPackages(): Observable<string[]> {
        return this.httpClient.get<string[]>(
            `${environment.server}/${this.API_URI}/packages`
        );
    }

    getAccountsExample(): Observable<Account[]> {
        return this.httpClient.get<Account[]>(
            `${environment.server}/${this.API_URI}/import/example`
        );
    }

    create(account: AccountCreate): Observable<Account> {
        return this.httpClient.post<Account>(
            `${environment.server}/${this.API_URI}/create`,
            account
        );
    }

    update(account: Account): Observable<Account> {
        return this.httpClient.put<Account>(
            `${environment.server}/${this.API_URI}/update`,
            account
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${environment.server}/${this.API_URI}/delete/${id}`
        );
    }
}
