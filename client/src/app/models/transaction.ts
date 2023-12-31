import { Account } from "./account";
import { BasicModel } from "./basic-model";

export interface Transaction extends BasicModel {
    id: string;
    account: Account;
    value: number;
    notes: string;
    executionDate: Date;
    isExecuted: boolean;
}