import { createActionGroup, props } from "@ngrx/store";
import { StoreSources } from "../store.module";
import { Account } from "src/app/models/account";

export enum AccountActionEvents {
    CREATE = "Created",
    EDIT = "Edited",
    DELETE = "Deleted"
};

export const chartOfAccounts = createActionGroup({
    source: StoreSources.CHART_OF_ACCOUNTS,
    events: {}
})