import { SoftwareRequest, SoftwareRequestForm } from "../types/softwareRequest.types";
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
        attendant_id: sendData.attendant,
        commitment_date: sendData.commitmentDate,
        status: 'pending'
    }
    const { data } = await api.post(`/api/software-requests`, body);	
    return data;
};
