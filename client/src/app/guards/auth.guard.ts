import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = Inject(Router);
    const existingToken = localStorage.getItem("token");

    if (!existingToken) {
        router.navigate(["login"]);
    }

    return !!existingToken;
};
