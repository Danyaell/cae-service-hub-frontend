import { SoftwareRequest, SoftwareRequestForm } from "../types/SoftwareRequest";
import api from "./config/axiosInstance";

export const getAllSoftwareRequestsService = async (): Promise<SoftwareRequest[]> => {
    const { data } = await api.get('/api/software-requests');
    return data;
};

export const getSoftwareRequestByIdService = async (id: number): Promise<SoftwareRequest> => {
    const { data } = await api.get(`/api/software-requests/${id}`);	
    return data;
};

export const createSoftwareRequestService = async (sendData: SoftwareRequestForm): Promise<SoftwareRequest> => {
    const body = {
        request_date: sendData.requestDate,
        requestor_name: sendData.requestorName,
        room: sendData.room,
        software: sendData.software,
        attendant: sendData.attendant,
        commitment_date: sendData.commitmentDate
    }
    const { data } = await api.post(`/api/software-requests`, body);	
    return data;
};
