import { BasicModel } from "./basic-model";

export interface Account extends BasicModel {
    id: string;
    type: string;
    subType: string;
    group: string;
    description: string;
    notes: string;
    code: number;
    sign: number;
    accountsPackage: string;
    createdDate: Date;
    lastModifiedDate: Date;
}