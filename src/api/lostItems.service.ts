import { LostItem, LostItemForm } from "../types/lostItem.types";
import api from "./config/axiosInstance";

export const getAllLostItemsService = async (): Promise<LostItem[]> => {
    const { data } = await api.get('/api/lost-items');
    return data;
};

export const getLostItemById = async (id: number): Promise<LostItem> => {
    const { data } = await api.get(`api/lost-items/${id}`);
    return data;
};

export const createLostItemService = async (sendData: LostItemForm): Promise<LostItem> => {
    const body = {
        date: sendData.date,
        room: sendData.room,
        description: sendData.description,
        returned: sendData.returned
    }
    const { data } = await api.post(`/api/lost-items`, body);
    return data;
};

export const editLostItemService = async (sendData: LostItemForm, id: number): Promise<LostItem> => {
    const body = {
        date: sendData.date,
        room: sendData.room,
        description: sendData.description,
        returned: sendData.returned
    }
    const { data } = await api.put(`/api/lost-items/${id}`, body);
    return data;
};

export const deleteLostItemById = async (id: number): Promise<LostItem> => {
    const { data } = await api.delete(`api/lost-items/${id}`);
    return data;
};
