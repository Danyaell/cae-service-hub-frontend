import { Attendant } from "./user.types";

export interface Report {
    id: number;
    report_date: Date;
    reporter_name: string;
    role: string;
    room: string;
    pc: string;
    description: string;
    attendant?: Attendant | null;
    attendant_id: number | undefined;
    action_taken: string;
    status: "pending" | "in_progress" | "needs_attention" | "completed" | "cancelled"
};

export interface ReportForm {
    reportDate: Date | null;
    reporterName: string;
    role: string;
    room: string;
    pc: string;
    description: string;
    attendantId: number;
    actionTaken: string;
    status: "pending" | "in_progress" | "needs_attention" | "completed" | "cancelled"
};
