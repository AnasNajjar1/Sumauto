import { Slot } from '../../../../../hexagon/interfaces';

export const someDealerSlots: Slot[] = [
    {
        date: '2021-07-05',
        hours: [
            { id: 1, hour: '0900', status: 'open' },
            { id: 2, hour: '0930', status: 'closed' },
            { id: 3, hour: '1000', status: 'open' },
            { id: 4, hour: '1030', status: 'closed' },
        ],
    },
    {
        date: '2021-07-06',
        hours: [
            { id: 1, hour: '0900', status: 'closed' },
            { id: 2, hour: '0930', status: 'open' },
            { id: 3, hour: '1000', status: 'closed' },
            { id: 4, hour: '1030', status: 'open' },
            { id: 5, hour: '1100', status: 'open' },
            { id: 6, hour: '1130', status: 'open' },
        ],
    },
];
