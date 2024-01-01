import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRestricted } from '../models/user.restricted';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/user-login';
import { UserSignup } from '../models/user-signup';
import { UserLoginResponse } from '../models/user-login-response';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly API_URI = "api/v1/user";

    constructor(private httpClient: HttpClient) { }

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
        );
    }

    signup(user: UserSignup): Observable<UserRestricted> {
        return this.httpClient.post<UserRestricted>(
            `${environment.server}/${this.API_URI}/signup`,
            user
        );
    }
}
