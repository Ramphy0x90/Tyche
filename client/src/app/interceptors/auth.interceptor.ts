import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userToken = localStorage.getItem("token");

    if (userToken) {
        const newReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${userToken}`)
        });

        return next(newReq);
    }

    return next(req);
};
