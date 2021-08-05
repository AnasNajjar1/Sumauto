import { RecordIds, TRecord } from '../../../../../hexagon/interfaces';

export const aRecordIds: RecordIds = {
    id: 104715,
    reference: 'a145zdse58bc',
};

export const somesRecords: TRecord[] = [
    {
        id: 100,
        status: 'created',
        vehicle: {
            makeName: 'Peugeot',
            modelName: '2008',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            lastName: 'doe',
            firstName: 'john',
            zipCode: '12345',
        },
        valuation: {
            value: 10000,
            status: true,
        },
        appointment: {
            status: false,
        },
    },
    {
        id: 200,
        status: 'created',
        vehicle: {
            makeName: 'Fiat',
            modelName: 'Panda',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            lastName: 'doe',
            firstName: 'john',
            zipCode: '12345',
        },
        valuation: {
            value: 10000,
            status: true,
        },
        appointment: {
            status: true,
        },
    },
    {
        id: 300,
        status: 'created',
        vehicle: {
            makeName: 'Peugeot',
            modelName: '2008',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            lastName: 'doe',
            firstName: 'john',
            zipCode: '12345',
        },
        valuation: {
            value: 0,
            status: false,
        },
        appointment: {
            status: false,
        },
    },
];
