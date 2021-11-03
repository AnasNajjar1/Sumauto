import { isLeft } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const saveVehicleAndUserInformationsUseCase =
    (): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
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
        const { history, imported, running } = getState().form.vehicleState;

        const resultState = await recordGateway.saveVehicleStateInformation(
            config.identifier,
            recordUid,
            {
                history,
                imported,
                running,
            },
        );

        if (isLeft(resultState)) {
            return dispatch(dislayErrorUseCase('create_state_failed'));
        }

        // saving user information
        const { email, phone, zipCode } = getState().form.particular;

        const params = {
            phone,
            email,
            zipCode,
        };

        if (params.phone === '') delete params.phone;

        const resultUser = await recordGateway.saveUserInformation(
            config.identifier,
            recordUid,
            params,
        );

        if (isLeft(resultUser)) {
            return dispatch(dislayErrorUseCase('create_particular_failed'));
        }

        // Updating purchase project
        const { purchaseProject } = getState().form.vehicleState;

        if (purchaseProject) {
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
        const resultQuotation = await recordGateway.createQuotation(config.identifier, recordUid);
        await dispatch(getRecordUseCase(recordUid));

        if (isLeft(resultQuotation)) {
            return dispatch(dislayErrorUseCase('create_quotation_failed'));
        }

        return dispatch(
            actionCreators.Actions.saveVehicleAndUserInformationsSaved(resultVehicle.right),
        );
    };
