export interface Report {
    id: number;
    report_date: Date;
    reporter_name: string;
    role: string;
    room: string;
    pc: string;
    description: string;
    attendant: string;
    action_taken: string;
};

export interface ReportForm {
    reportDate: Date | null;
    reporterName: string;
    role: string;
    room: string;
    pc: string;
    description: string;
    attendant: string;
    actionTaken: string;
};