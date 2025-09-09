import { LoginResponse, SigninResponse } from "../types/login.types";
import api from "./config/axiosInstance";

export const loginService = async (name: string, password: string): Promise<LoginResponse> => {
    const body = {
        name: name,
        password: password,
    };
    //TODO: add token
    const { data } = await api.post('api/users/login', body);
    return data;
};

export const signinService = async (bodyData: {name: string, password: string, role: string}): Promise<SigninResponse> => {
    const body = {
        name: bodyData.name,
        password: bodyData.password,
        role: bodyData.role,
    };
    const { data } = await api.post('api/users/register', body);
    return data;
}