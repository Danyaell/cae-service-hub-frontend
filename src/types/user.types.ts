export interface Attendant {
    id: number;
    name: string;
    role: string;
};

export interface User {
    id: number;
    name: string;
    role: string;
    created_at: Date;
    updated_at?: Date;
}

export interface UserForm {
    name: string;
    password: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;
}