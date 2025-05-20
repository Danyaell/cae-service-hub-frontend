import { Report, ReportForm } from "../types/report.types";
import api from "./config/axiosInstance";

export const createReportService = async (sendData: ReportForm): Promise<Report> => {
    const body = {
        report_date: sendData.reportDate,
        reporter_name: sendData.reporterName,
        role: sendData.role,
        room: sendData.room,
        pc: sendData.pc,
        description: sendData.description,
        attendant: sendData.attendant,
        action_taken: sendData.actionTaken
    }
    const { data } = await api.post(`/api/reports`, body);	
    return data;
};