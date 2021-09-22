interface AutobizHour {
    id: string | null;
    hour: number;
    status: 1 | 0;
}

interface AutobizDay {
    date: string;
    hours: AutobizHour[];
}

export interface AutobizSlotsDto {
    networkId: string;
    dealerId: string;
    name: string;
    city: string;
    adress: string;
    startHour: string;
    endHour: string;
    startBreak: string;
    endBreak: string;
    slots: AutobizDay[];
}
