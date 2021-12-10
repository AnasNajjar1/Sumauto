import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getClientSelector } from '../../view-models-generators/clientSelector';

const useTracker = (
    vehicle: any,
    vehicleState: any,
    particular: any,
    displaySectionMoreDetails: any,
    displaySectionAdditionalInformation: any,
    privacyChecked: any,
    canQuote: any,
    submitting: any,
) => {
    const { config } = useSelector(getClientSelector);

    const trackerPushEvent = (event: string, step: string) => {
        const message = { type: 'event', event, step };
        // @ts-ignore-start
        if ('parentIFrame' in window) window.parentIFrame.sendMessage(message);
        // @ts-ignore-end
    };

    const usePrevious = (value: any) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    };

    const compareObject = (oldState: any, newState: any) => {
        const combined = { ...oldState, ...newState };
        const diff = Object.entries(combined).reduce((acc: any, [key, value]) => {
            if (newState[key] !== oldState[key]) acc[key] = value;
            return acc;
        }, {});
        return diff;
    };
    const prevVehicle = usePrevious(vehicle) as any;
    const prevVehicleState = usePrevious(vehicleState) as any;
    const prevParticular = usePrevious(particular) as any;

    // Tracking Step 1 - Vehicle
    useEffect(() => {
        const diffVehicle = compareObject(prevVehicle, vehicle);
        if (diffVehicle.make)
            trackerPushEvent('step1_choix_marque', 'form/information_de_base_choix_marque');
        if (diffVehicle.model)
            trackerPushEvent('step1_choix_modele', 'form/information_de_base_choix_modele');
        if (diffVehicle.month)
            trackerPushEvent(
                'step1_choix_mois_immatriculation',
                'form/information_de_base_choix_mois_immatriculation',
            );
        if (diffVehicle.year)
            trackerPushEvent(
                'step1_choix_annee_immatriculation',
                'form/information_de_base_choix_annee_immatriculation',
            );
        if (diffVehicle.fuel)
            trackerPushEvent('step1_choix_carburant', 'form/information_de_base_choix_carburant');
        if (diffVehicle.body) {
            trackerPushEvent(
                'step1_choix_carrosserie',
                'form/information_de_base_choix_carrosserie',
            );
        }

        if (diffVehicle.door) {
            trackerPushEvent('step2_porte', 'form/mes_details_porte');
        }

        if (diffVehicle.gear) {
            trackerPushEvent('step2_boite_vitesse', 'form/mes_details_boite_vitesse');
        }

        if (diffVehicle.version) {
            trackerPushEvent('step2_version', 'form/mes_details_version');
        }

        if (diffVehicle.engine) {
            // trackerPushEvent('', '');
        }

        if (diffVehicle.mileage) {
            trackerPushEvent('step2_kilometrage', 'form/mes_details_kilometrage');
        }
    }, [vehicle]);

    useEffect(() => {
        const diffVehicleState = compareObject(prevVehicleState, vehicleState);

        if (diffVehicleState.imported) {
            trackerPushEvent('step2_importation', 'form/mes_details_importation');
        }

        if (diffVehicleState.history) {
            trackerPushEvent('step3_historique_entretien', 'form/information_historique_entretien');
        }

        if (diffVehicleState.running) {
            trackerPushEvent('step3_etat_voiture', 'form/information_etat_voiture');
        }

        if (diffVehicleState.notRollingReason) {
            // trackerPushEvent('', '');
        }

        if (diffVehicleState.notRollingDescription) {
            // trackerPushEvent('', '');
        }

        if (diffVehicleState.purchaseProject) {
            trackerPushEvent('step3_delai_vente', 'form/information_delai_vente');
        }
    }, [vehicleState]);

    useEffect(() => {
        const diffParticular = compareObject(prevParticular, particular);

        if (diffParticular.email) {
            trackerPushEvent('step3_email', 'form/information_email');
            if (config.emailConfirmation)
                trackerPushEvent('step3_confirmation_email', 'form/information_confirmation_email');
        }

        if (diffParticular.zipCode) {
            trackerPushEvent('step3_code_postal', 'form/information_code_postal');
        }

        if (diffParticular.phone) {
            trackerPushEvent('step3_telephone', 'form/information_telephone');
        }
    }, [particular]);

    useEffect(() => {
        if (displaySectionMoreDetails) {
            trackerPushEvent('step1_validate', 'form/information_de_base');
        }
    }, [displaySectionMoreDetails]);

    useEffect(() => {
        if (displaySectionAdditionalInformation) {
            trackerPushEvent('step2_validate', 'form/mes_details');
        }
    }, [displaySectionAdditionalInformation]);

    useEffect(() => {
        if (privacyChecked) {
            trackerPushEvent(
                'step3_condition_utilisation',
                'form/information_condition_utilisation',
            );
        }
    }, [privacyChecked]);

    useEffect(() => {
        if (canQuote) {
            trackerPushEvent('step3_validate', 'form/information_additionnelle');
        }
    }, [canQuote]);

    useEffect(() => {
        if (submitting) {
            trackerPushEvent('step4_validate', 'form/validation_formulaire');
        }
    }, [submitting]);

    return { trackerPushEvent, compareObject, usePrevious };
};

export default useTracker;
