export interface AutobizMake {
    id: number;
    name: string;
}
export interface AutobizMakesDto {
    preferred: AutobizMake[];
    others: AutobizMake[];
    all: AutobizMake[];
}
