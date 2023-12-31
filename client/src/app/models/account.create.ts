export interface AccountCreate {
    type: string;
    subType: string;
    group: string;
    description: string;
    notes: string;
    code: number;
    sign: number;
    accountsPackage: string;
}