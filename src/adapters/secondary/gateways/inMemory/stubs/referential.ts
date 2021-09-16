import { Makes, VehicleElement } from '../../../../../hexagon/interfaces';

export type InMemoryReferential = {
    makes: Makes;
    models: VehicleElement[];
    versions: VehicleElement[];
    years: VehicleElement[];
    months: VehicleElement[];
    fuels: VehicleElement[];
    bodies: VehicleElement[];
    gears: VehicleElement[];
    engines: VehicleElement[];
    doors: VehicleElement[];
};

export const inMemoryReferential: InMemoryReferential = {
    makes: {
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
    },
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
