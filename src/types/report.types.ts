import { Attendant } from "./user.types";

export interface Report {
    id: number;
    report_date: Date;
    reporter_name: string;
    role: string;
    room: string;
    pc: string;
    description: string;
    attendant: Attendant | null;
    action_taken: string;
    status: "pending" | "in_progres" | "needs_attention" | "completed" | "cancelled"
};

export interface ReportForm {
    reportDate: Date | null;
    reporterName: string;
    role: string;
    room: string;
    pc: string;
    description: string;
    attendant: Attendant | null;
    actionTaken: string;
    status: "pending" | "in_progres" | "needs_attention" | "completed" | "cancelled"
};
