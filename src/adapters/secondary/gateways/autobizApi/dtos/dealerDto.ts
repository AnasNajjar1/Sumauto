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
