export interface AutobizRecordDetailsDto {
    record: {
        rf_id: string;
        creation_date: string;
        available_ind: string;
        status: string;
        source_id: string;
        offre: string;
        spancol: string;
        dbl: string;
        dblabs: string;
    };
    customer: any;
    vehicle: {
        creation_date: string;
        update_date: string;
        registration: string;
        registration_date: string;
        gray_card_date: string;
        version_id: string;
        mileage: string;
        version_label: string;
        brand_id: string;
        model_id: string;
        fuel_id: string;
        body_id: string;
        engine_din: string;
        gearbox_id: string;
        brand_label: string;
        model_label: string;
        fuel_label: string;
        body_label: string;
        gearbox_label: string;
    };
    valuation: any;
    vehicleState: {
        creation_date: string;
        update_date: string;
        internal_state: string;
        internal_state_label: string;
        general_state: string;
        general_state_label: string;
        mechanical_state: string;
        rear_tire: string;
        rear_tire_label: string;
        front_tire: string;
        front_tire_label: string;
        first_hand: string;
        imported: string;
        servicing_manual: string;
        purchase_invoice: string;
        free_comment: string;
    };
}
