export interface Make {
    id: number;
    name: string;
}
export interface MakesDto {
    preferred: Make[];
    others: Make[];
    all: Make[];
}
