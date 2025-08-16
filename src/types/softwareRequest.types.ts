import { Attendant } from "./user.types";

export interface SoftwareRequest {
        id: number,
        request_date: Date,
        requestor_name: string,
        room: "A203" | "A204",
        software: string,
        attendant: Attendant | null,
        attendant_id: number | undefined;
        commitment_date: null,
        status: "pending" | "in_progress" | "needs_attention" | "completed" | "cancelled",
};

export interface SoftwareRequestForm {
    requestDate: Date | null; 
    requestorName: string;
    room: string;
    software: string;
    attendantId: number;
    commitmentDate: Date | null;
    status: "pending" | "in_progress" | "needs_attention" | "completed" | "cancelled",
};
