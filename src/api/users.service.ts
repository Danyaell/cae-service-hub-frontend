import { Attendant } from "../types/user.types";
import api from "./config/axiosInstance";

export const getUsersService = async (): Promise<Attendant[]> => {
    const { data } = await api.get('api/users/');
    return  data;
};