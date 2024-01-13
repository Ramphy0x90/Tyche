import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserIsLogged } from '../store/selectors/user.selector';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const router: Router = inject(Router);
    const store: Store = inject(Store);

    return store.select(selectUserIsLogged).pipe(
        tap((userLogged) => {
            if (!userLogged) {
                router.navigate(["login"]);
            } else {
                const currentPath = router.url;

                if (currentPath === "login" || currentPath === "signup") {
                    router.navigate(["home"]);
                }
            }

            return userLogged
        })
    );
};
