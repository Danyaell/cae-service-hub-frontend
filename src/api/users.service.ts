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