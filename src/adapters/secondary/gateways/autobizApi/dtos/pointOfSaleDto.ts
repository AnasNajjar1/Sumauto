interface AutobizExpert {
    id: string;
    name: string;
    picture: string;
    link: string;
}

export interface AutobizPointOfSaleDto {
    networkId: string;
    dealerId: string;
    name: string;
    city: string;
    adress: string;
    distance: string;
    experts: AutobizExpert[];
}
