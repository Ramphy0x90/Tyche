import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRestricted } from '../models/user.restricted';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/user-login';
import { UserSignup } from '../models/user-signup';
import { UserLoginResponse } from '../models/user-login-response';
import { Store } from '@ngrx/store';
import { user } from '../store/actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly API_URI = "api/v1/user";

    constructor(
        private readonly store: Store,
        private httpClient: HttpClient
    ) { }

    getAll(from: number = 0, limit: number = -1): Observable<UserRestricted[]> {
        return this.httpClient.get<UserRestricted[]>(
            `${environment.server}/${this.API_URI}/all`
        );
    }

    getById(id: string): Observable<UserRestricted> {
        return this.httpClient.get<UserRestricted>(
            `${environment.server}/${this.API_URI}/${id}`
        );
    }

    login(credentials: UserLogin): Observable<UserLoginResponse> {
        return this.httpClient.post<UserLoginResponse>(
            `${environment.server}/${this.API_URI}/login`,
            credentials
        ).pipe(
            tap((loginResponse) => {
                if (loginResponse.token && loginResponse.user) {
                    localStorage.setItem("token", loginResponse.token);
                }
            })
        );
    }

    signup(user: UserSignup): Observable<UserRestricted> {
        return this.httpClient.post<UserRestricted>(
            `${environment.server}/${this.API_URI}/signup`,
            user
        );
    }

    isTokenValid(token: string): Observable<UserLoginResponse> {
        return this.httpClient.get<UserLoginResponse>(
            `${environment.server}/${this.API_URI}/check/token/${token}`
        );
    }

    logout(): void {
        localStorage.removeItem("token");
        this.store.dispatch(user.loggedOut());
    }
}
