import { Report, ReportForm } from "../types/report.types";
import api from "./config/axiosInstance";

export const getAllReportsService = async (): Promise<Report[]> => {
    const { data } = await api.get('/api/reports');
    return data;
};

export const createReportService = async (sendData: ReportForm): Promise<Report> => {
    const body = {
        report_date: sendData.reportDate,
        reporter_name: sendData.reporterName,
        role: sendData.role,
        room: sendData.room,
        pc: sendData.pc,
        description: sendData.description,
        attendant: sendData.attendantId === null || sendData.attendantId < 0 ? null : sendData.attendantId,
        action_taken: sendData.actionTaken,
        status: 'pending'
    }
    const { data } = await api.post(`/api/reports`, body);	
    return data;
};