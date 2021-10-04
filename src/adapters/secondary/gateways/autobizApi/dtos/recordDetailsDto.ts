import { AutobizAppointmentDto } from "./appointmentDto";

export interface AutobizRecordDetailsDto {
    record: {
        RfId: string;
        uid: string;
        HexaRfId: string;
        createdAt: string;
        updatedAt: string;
        enabled: 'yes' | 'no';
        expired: boolean;
        statusId: string;
        statusLabel: string;
        sourceId: string;
        sourceLabel: string;
        offerId: string;
        offerLabel: string;
        spancol: string;
        duplicated: 'yes' | 'no';
    };
    customer: {
        createdAt: string;
        updatedAt: string;
        lastName: string;
        firstName: string;
        email: string;
        phone: string;
        phone2: string;
        zipCode: string;
        unsubscribed: string;
        purchaseProject: string;
        purchaseBrandId: string;
        purchaseBrandLabel: string;
        purchaseModeleId: string;
        purchaseModeleLabel: string;
        purchaseDeadline: string;
    };
    vehicle: {
        createdAt: string;
        updatedAt: string;
        registration: string;
        registrationDate: string;
        grayCardDate: string;
        mileage: string;
        versionId: string;
        versionLabel: string;
        brandId: string;
        brandLabel: string;
        modelId: string;
        modelLabel: string;
        fuelId: string;
        fuelLabel: string;
        bodyId: string;
        bodyLabel: string;
        gearboxId: string;
        gearboxLabel: string;
        doorsNumber: string;
        engineDin: string;
    };
    valuation: {
        createdAt: string;
        updateAt: string;
        corrected: string;
        particular: string;
        internet: string;
        price: string;
        boostedPrice: string;
    };
    vehicleState: {
        createdAt: string;
        updateAt: string;
        interior: string;
        general: string;
        mechanical: string;
        rearTires: string;
        frontTires: string;
        imported: string;
        firstHand: string;
        servicingHistory: string;
        servicingInvoice: string;
        comment: string;
    };
    appointment?: AutobizAppointmentDto;
}
