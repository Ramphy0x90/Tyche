import { Account } from "./account";

export interface TransactionRestricted {
    account?: Account;
    value: number;
    notes: string;
    isExecuted: boolean;
}