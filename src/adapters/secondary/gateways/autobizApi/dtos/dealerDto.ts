export interface Expert {
    id: string;
    name: string;
    picture: string;
    link: string;
}

export interface AutobizDealerDto {
    networkId: string;
    dealerId: string;
    name: string;
    city: string;
    adress: string;
    distance: string;
    experts: Expert[];
}

export interface AutobizDealerSlotDto {
    date: string;
    hours: AutobizDealerSlotHourDto[];
}

export interface AutobizDealerSlotHourDto {
    id: string | null;
    hour: number;
    status: 0 | 1;
}
