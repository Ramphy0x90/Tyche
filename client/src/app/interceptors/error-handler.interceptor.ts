import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { user } from "../store/actions/user.actions";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(
        private readonly store: Store,
        private toastr: ToastrService,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let msg: string;

                if (!error.ok && error.status == 0) {
                    msg = "Server non raggiungibile :(";
                } else if (error.error.error) {
                    msg = error.error.message;
                } else if (error.error) {
                    msg = `${error.error}`;
                } else {
                    msg = "Errore scnonoschiuto";
                }

                if (error.status == 401 || error.status == 403) {
                    this.store.dispatch(user.loggedOut());
                    this.router.navigate(["login"]);
                }

                this.toastr.warning(msg);
                return throwError(() => msg);
            })
        );
    }
}