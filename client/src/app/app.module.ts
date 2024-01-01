import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ContainersModule } from './containers/containers.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { userReducer } from './store/reducers/user.reducer';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        SideNavBarComponent,
        NavBarComponent,
        ContainersModule,
        StoreModule.forRoot({ app: appReducer, user: userReducer })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
