import { Attendant, User } from "../types/user.types";
import api from "./config/axiosInstance";

export const getUsersService = async (): Promise<Attendant[]> => {
    const { data } = await api.get('api/users/');
    return  data;
};

export const getUserByIdService = async (id: number): Promise<User> => {
    const { data } = await api.get(`api/users/${id}`);
    return  data;
}

export const updateUserService = async (id: number, requestBody: { name: string, password: string, role: string } ): Promise<User> => {
    const { data } = await api.put(`api/users/${id}`, requestBody);
    return data;
};

export const deleteUserService = async (id: number): Promise<User> => {
    const { data } = await api.delete(`api/users/${id}`);
    return data;
}