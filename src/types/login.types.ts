import { Attendant } from "./user.types"

export interface LoginResponse {
    message: string;
    data: {
        user: Attendant;
        token: string;
    }
}

export interface LoginForm {
    name: string,
    password: string,
};