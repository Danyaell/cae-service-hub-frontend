export interface SoftwareRequest {
        id: 1,
        request_date: Date,
        requestor_name: string,
        room: "A203" | "A204",
        software: string,
        attendant: string,
        commitment_date: null
};

export interface SoftwareRequestForm {
    requestDate: Date | null; 
    requestorName: string;
    room: string;
    software: string;
    attendant: string;
    commitmentDate: Date | null;
};
