import { RecordIds, TRecord } from '../../../../../hexagon/interfaces';

export const aRecordIds: RecordIds = {
    id: 100,
    uid: 'bbb',
    reference: 'a145zdse58bc',
};

export const somesRecords: TRecord[] = [
    {
        id: '100',
        uid: 'aaa',
        offerStatus: 'NO_APPOINTMENT',
        offerNumber: 'WITHOUT_APPOINTMENT',
        vehicle: {
            makeId: '100',
            makeName: 'Peugeot',
            modelName: '2008',
            year: '2020',
            month: 'Enero',
            registrationDate: new Date(),
            bodyName: 'Sedan',
            fuelName: 'Gasolina',
            engineName: '92CH',
            gearName: 'automatica',
            versionName: '1.6 bluehdi 75 active',
            import: true,
            mileage: 45000,
            doors: '5',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            name: 'john',
            zipCode: '12345',
        },
        // valuation: {
        //     value: 10000,
        //     date: new Date('2020-08-20'),
        // },
    },
    {
        id: '200',
        uid: 'bbb',
        offerStatus: 'CONFIRMED',
        offerNumber: 'WITH_APPOINTMENT',
        vehicle: {
            makeId: '100',
            makeName: 'Fiat',
            modelName: 'Panda',
            year: '2020',
            month: 'Enero',
            registrationDate: new Date(),
            bodyName: 'Sedan',
            fuelName: 'Gasolina',
            engineName: '92CH',
            gearName: 'automatica',
            versionName: '1.6 bluehdi 75 active',
            import: true,
            mileage: 15000,
            doors: '5',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            name: 'john',
            zipCode: '12345',
        },
        valuation: {
            privateValue: 5000,
            value: 6000,
            date: new Date('2020-08-20'),
        },
        appointment: {
            id: 39132,
            createdAt: '2021-09-16 12:18:51',
            updatedAt: '0000-00-00 00:00:00',
            status: Boolean(1),
            lastOne: 'yes',
            active: 'yes',
            appointmentDate: '2021-09-16 00:00:00',
            startHour: '1500',
            endHour: '1600',
            expertId: 1636907,
            expertName: 'Expert PDV',
            networkId: 5701,
            dealerId: 503546,
            dealerName: 'TEST PDV 2',
            realDealerName: 'real TEST PDV 2',
            address: 'Paris, test, 70',
            zipCode: 25633,
            city: 'Paris',
            phone: '123466',
            latitude: 1.2,
            longitude: 1.6,
        },
    },
    {
        id: '300',
        uid: 'ccc',
        offerStatus: 'EXPIRED',
        offerNumber: 'EXPIRED',
        vehicle: {
            makeId: '100',
            makeName: 'Renault',
            modelName: 'Clio',
            year: '2020',
            month: 'Enero',
            registrationDate: new Date(),
            bodyName: 'Sedan',
            fuelName: 'Gasolina',
            engineName: '92CH',
            gearName: 'automatica',
            versionName: '1.6 bluehdi 75 active',
            import: true,
            mileage: 20000,
            doors: '5',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            name: 'john',
            zipCode: '12345',
        },
        valuation: {
            privateValue: 17000,
            value: 18000,
            date: new Date('2020-01-01'),
        },
    },
    {
        id: '500',
        uid: 'eee',
        offerStatus: 'UNQUOTABLE',
        offerNumber: 'NOT_QUOTABLE',
        vehicle: {
            makeId: '100',
            makeName: 'Peugeot',
            modelName: '2008',
            year: '2020',
            month: 'Enero',
            registrationDate: new Date(),
            bodyName: 'Sedan',
            fuelName: 'Gasolina',
            engineName: '92CH',
            gearName: 'automatica',
            versionName: '1.6 bluehdi 75 active',
            import: true,
            mileage: 90000,
            doors: '5',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            name: 'john',
            zipCode: '12345',
        },
    },
    {
        id: '400',
        uid: 'ddd',
        offerStatus: 'CONFIRMED',
        offerNumber: 'REFRESHED',
        vehicle: {
            makeId: '100',
            makeName: 'Peugeot',
            modelName: '2008',
            year: '2020',
            month: 'Enero',
            registrationDate: new Date(),
            bodyName: 'Sedan',
            fuelName: 'Gasolina',
            engineName: '92CH',
            gearName: 'automatica',
            versionName: '1.6 bluehdi 75 active',
            import: true,
            mileage: 90000,
            doors: '5',
        },
        customer: {
            email: 'john@doe.fr',
            phone: '912341234',
            name: 'john',
            zipCode: '12345',
        },
        valuation: {
            value: 16500,
            privateValue: 17500,
            date: new Date('2020-08-20'),
        },
    },
];
