import { LoginResponse } from "../types/login.types";
import api from "./config/axiosInstance";

export const loginService = async (name: string, password: string): Promise<LoginResponse> => {
    const body = {
        name: name,
        password: password,
    };
    const { data } = await api.post('api/users/login', body);
    return data;
};