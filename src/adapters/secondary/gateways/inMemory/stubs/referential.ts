import { TRefrentialElement } from '../../../../../hexagon/interfaces';

export type InMemoryReferential = {
    makes: any;
    models: TRefrentialElement[];
    versions: TRefrentialElement[];
    years: TRefrentialElement[];
    months: TRefrentialElement[];
    fuels: TRefrentialElement[];
    bodies: TRefrentialElement[];
    gears: TRefrentialElement[];
    engines: TRefrentialElement[];
    doors: TRefrentialElement[];
};

export const inMemoryReferential: InMemoryReferential = {
    makes: [
        {
            preferred: [
                {
                    id: 82,
                    name: 'PEUGEOT',
                },
            ],
            others: [
                {
                    id: 84,
                    name: 'RENAULT',
                },
            ],
            all: [
                {
                    id: 82,
                    name: 'PEUGEOT',
                },
                {
                    id: 84,
                    name: 'RENAULT',
                },
            ],
            0: [
                {
                    id: 82,
                    name: 'PEUGEOT',
                },
                {
                    id: 84,
                    name: 'RENAULT',
                },
            ],
        },
    ],
    models: [
        {
            id: 10,
            name: '3008',
        },
        {
            id: 11,
            name: '208',
        },
    ],
    versions: [
        {
            id: 100,
            name: '1.3 GTI',
        },
        {
            id: 101,
            name: '1.2 TURBO',
        },
    ],
    months: [
        {
            id: 6,
            name: 'JUIN',
        },
    ],
    years: [
        {
            id: 2018,
            name: '2018',
        },
    ],
    fuels: [
        {
            id: 100,
            name: 'DIESEL',
        },
    ],
    bodies: [
        {
            id: 100,
            name: 'SUV',
        },
    ],
    gears: [
        {
            id: 100,
            name: 'MANUELLE',
        },
    ],
    engines: [
        {
            id: 100,
            name: '78',
        },
    ],
    doors: [
        {
            id: 5,
            name: '5',
        },
    ],
};
