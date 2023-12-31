export type BasicModelType = {
    [key in string]: any
}

export interface BasicModel extends BasicModelType {
    createdDate: Date;
    lastModifiedDate: Date;
}