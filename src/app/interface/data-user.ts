export interface DataUser {
    first_name: string;
    email: string;
    birth_date: string;
    status: string;
}

export interface DataUserAll extends DataUser {
    id: number;
    last_name: string;
    registration_date: string;
    ip_adress: number;
}