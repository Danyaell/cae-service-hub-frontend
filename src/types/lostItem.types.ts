export interface LostItem {
    id: number;
    date: Date;
    room: string;
    description: string;
    returned: boolean;
};

export interface LostItemForm {
    date: Date | null;
    room: string;
    description: string;
    returned: boolean;
};
