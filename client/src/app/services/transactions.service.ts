import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Transaction } from '../models/transaction';
import { Observable } from 'rxjs';
import { TransactionRestricted } from '../models/transaction.restricted';

@Injectable({
    providedIn: 'root'
})
export class TransactionsService {
    private readonly API_URI = "api/v1/transaction";

    constructor(private httpClient: HttpClient) { }

    getAll(from: number = 0, limit: number = -1): Observable<Transaction[]> {
        const params = new HttpParams()
            .set("from", from)
            .set("limit", limit);

        return this.httpClient.get<Transaction[]>(
            `${environment.server}/${this.API_URI}/all`,
            { params }
        );
    }

    create(transaction: TransactionRestricted): Observable<Transaction> {
        return this.httpClient.post<Transaction>(
            `${environment.server}/${this.API_URI}/create`,
            transaction
        );
    }

    update(transaction: Transaction): Observable<Transaction> {
        return this.httpClient.put<Transaction>(
            `${environment.server}/${this.API_URI}/update`,
            transaction
        );
    }

    delete(id: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${environment.server}/${this.API_URI}/delete/${id}`
        );
    }
}
