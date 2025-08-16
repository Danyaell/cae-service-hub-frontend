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
        attendant: sendData.attendantId === null || sendData.attendantId < 0 ? null : parseInt(sendData.attendantId.toString()),
        commitment_date: sendData.commitmentDate,
        status: 'pending'
    }
    const { data } = await api.post(`/api/software-requests`, body);	
    return data;
};

export const editSoftwareRequestService = async (sendData: SoftwareRequestForm, id: number): Promise<Report> => {
    const body = {
        request_date: sendData.requestDate,
        requestor_name: sendData.requestorName,
        room: sendData.room,
        software: sendData.software,
        attendant: sendData.attendantId === null || sendData.attendantId < 0 ? null : sendData.attendantId,
        commitment_date: sendData.commitmentDate,
        status: sendData.status
    }
    const { data } = await api.put(`/api/software-requests/${id}`, body);	
    return data;
};