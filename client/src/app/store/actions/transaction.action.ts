import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { StoreSources } from "../store.module";
import { Transaction } from "src/app/models/transaction";

export enum TransactionActionEvents {
    CREATE = "Created",
    EDIT = "Edited",
    DELETE = "Deleted"
};

export const transaction = createActionGroup({
    source: StoreSources.TRANSACTION,
    events: {
        [TransactionActionEvents.CREATE]: props<Transaction>(),
        [TransactionActionEvents.EDIT]: props<Transaction>(),
        [TransactionActionEvents.DELETE]: emptyProps(),
    }
});