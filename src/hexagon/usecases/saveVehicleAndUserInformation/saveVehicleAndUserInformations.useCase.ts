import { isLeft, isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { DealerGateway } from '../../gateways/dealerGateway.interface';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const saveVehicleAndUserInformationsUseCase =
    (): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        {
            recordGateway,
            dealerGateway,
        }: { recordGateway: RecordGateway; dealerGateway: DealerGateway },
    ) => {
        dispatch(actionCreators.Actions.saveVehicleAndUserInformationsSaving());

        const { config, journeyType } = getState().client;

        const { make, model, month, year, fuel, body, door, gear, engine, version, mileage } =
            getState().form.vehicle;

        // Saving vehicle and create record
        const resultVehicle = await recordGateway.saveVehicleInformation(
            config.identifier,
            journeyType,
            {
                make,
                model,
                month,
                year,
                fuel,
                body,
                door,
                gear,
                engine,
                version,
                mileage,
            },
        );

        if (isLeft(resultVehicle)) {
            dispatch(dislayErrorUseCase('create_record_failed'));
            return dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
        }
        const recordUid = resultVehicle.right.uid;

        dispatch(getRecordUseCase(recordUid));

        // Saving State

        const { history, imported, running, notRollingReason, notRollingDescription } =
            getState().form.vehicleState;

        const resultState = await recordGateway.saveVehicleStateInformation(
            config.identifier,
            recordUid,
            {
                history,
                imported,
                running,
                notRollingReason,
                notRollingDescription,
            },
        );

        if (isLeft(resultState)) {
            return dispatch(dislayErrorUseCase('create_state_failed'));
        }

        // saving user information
        const { email, phone, zipCode } = getState().form.particular;
        const { deviceType } = getState().client;

        const params = {
            phone,
            phone2: phone,
            email,
            zipCode,
            deviceType,
        };

        if (params.phone === '') delete params.phone;
        if (params.phone === '') delete params.phone2;
        if (params.phone2 === '') delete params.phone2;

        const resultUser = await recordGateway.saveUserInformation(
            config.identifier,
            recordUid,
            params,
        );

        if (isLeft(resultUser)) {
            return dispatch(dislayErrorUseCase('create_particular_failed'));
        }

        let quotationStatus = false;

        // Running / or VOI vehicle
        if (running === 'yes') {
            const { purchaseProject } = getState().form.vehicleState;

            if (purchaseProject) {
                // Updating purchase project
                const resultPurchaseProject = await recordGateway.updatePurchaseProject(
                    config.identifier,
                    recordUid,
                    purchaseProject,
                );

                if (isLeft(resultPurchaseProject)) {
                    return dispatch(dislayErrorUseCase('update_purchase_project_failed'));
                }
            }

            // create quotation
            const resultQuotation = await recordGateway.createQuotation(
                config.identifier,
                recordUid,
            );
            await dispatch(getRecordUseCase(recordUid));

            if (isLeft(resultQuotation)) {
                return dispatch(dislayErrorUseCase('create_quotation_failed'));
            }

            if (resultQuotation.right) {
                // quotation status == true
                quotationStatus = true;
            }
        }

        if (quotationStatus) {
            const resultDealerList = await dealerGateway.requestDealerList(
                config.identifier,
                recordUid,
            );

            if (isRight(resultDealerList)) {
                await recordGateway.sendMail(config.identifier, recordUid, 'restitution_mail');
            } else {
                await recordGateway.sendMail(config.identifier, recordUid, 'empty_network_mail');
            }
        } else {
            await recordGateway.sendMail(config.identifier, recordUid, 'cq_mail');
        }

        return dispatch(
            actionCreators.Actions.saveVehicleAndUserInformationsSaved(resultVehicle.right),
        );
    };
