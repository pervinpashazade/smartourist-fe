import { EAddonType } from "./enums";

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

export interface ICustomerCategory {
    id: number;
    name: string;
    color: string;
}

export interface ICustomer {
    id: number;
    email: string;
    fullname: string;
    phone: string;
    category?: ICustomerCategory;
}

export interface IYacht {
    id: number;
    name: string;
    guest_limit: number;
    publish_status: string;
    publish_status_date: string;
    main_image: string;
    prices: any[];
};

export interface IAddon {
    id: number;
    name: string;
    price: number;
    type: EAddonType;
    img_url: string;
    order_by: number;
    description: string;
}