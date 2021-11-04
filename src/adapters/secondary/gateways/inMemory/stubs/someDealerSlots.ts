import { Slot } from '../../../../../hexagon/interfaces';

export const someDealerSlots: Slot[] = [
    {
        date: '2021-07-05',
        hours: [
            { id: '1', hour: '09:00', status: 'open' },
            { id: '2', hour: '09:30', status: 'closed' },
            { id: '3', hour: '10:00', status: 'open' },
            { id: '4', hour: '10:30', status: 'closed' },
        ],
    },
    {
        date: '2021-07-06',
        hours: [
            { id: '5', hour: '09:00', status: 'closed' },
            { id: '6', hour: '09:30', status: 'open' },
            { id: '7', hour: '10:00', status: 'closed' },
            { id: '8', hour: '10:30', status: 'open' },
            { id: '9', hour: '11:00', status: 'open' },
            { id: '10', hour: '11:30', status: 'open' },
        ],
    },
];
