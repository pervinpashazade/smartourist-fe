export interface ICompany {
    id: number;
    name: string;
}

export interface IPermission {
    name: string;
}

export interface IRole {
    id: number;
    name: string;
    permissions: IPermission[];
}

export interface IUser {
    id: number;
    fullname: string;
    username: string;
    role: IRole;
    company: ICompany;
}