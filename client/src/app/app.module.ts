import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ContainersModule } from './containers/containers.module';
import { Store, StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { userReducer } from './store/reducers/user.reducer';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { authGuard } from './guards/auth.guard';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SideNavBarComponent,
        NavBarComponent,
        ContainersModule,
        StoreModule.forRoot({ app: appReducer, user: userReducer }),
        ToastrModule.forRoot({
            timeOut: 4500,
            positionClass: "toast-top-right",
            preventDuplicates: true,
            progressBar: true,
        }),
    ],
    providers: [
        provideHttpClient(
            withInterceptors([authInterceptor])
        ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
