import { NgModule } from "@angular/core";

@NgModule({
    imports: [],
    exports: []
})
export class StoreModule { }

export const enum StoreSources {
    APP = "APP",
    USER = "USER",
    TRANSACTION = "TRANSACTION",
    CHART_OF_ACCOUNTS = "CHART_OF_ACCOUNTS"
}