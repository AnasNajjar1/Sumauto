import { isLeft, isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import { dislayErrorUseCase } from '../displayError/displayError.useCase';
import { getRecordUseCase } from '../getRecord/getRecord.useCase';
import * as actionCreators from './actionCreators';

export const saveVehicleAndUserInformationsUseCase =
    (): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.saveVehicleAndUserInformationsSaving());

        const { config } = getState().client;

        const { make, model, month, year, fuel, body, door, gear, engine, version, mileage } =
            getState().form.vehicle;

        // Saving vehicle and create record
        const resultVehicle = await recordGateway.saveVehicleInformation(config.identifier, {
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
        });

        if (isLeft(resultVehicle)) {
            dispatch(dislayErrorUseCase('create_record_failed'));
            return dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
        }

        const recordId = resultVehicle.right.id;
        dispatch(getRecordUseCase(recordId.toString()));

        // Saving State
        const { history, imported, running } = getState().form.vehicleState;

        const resultState = await recordGateway.saveVehicleStateInformation(
            config.identifier,
            recordId,
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

        const resultUser = await recordGateway.saveUserInformation(config.identifier, recordId, {
            phone,
            email,
            zipCode,
        });

        if (isLeft(resultUser)) {
            return dispatch(dislayErrorUseCase('create_particular_failed'));
        }

        // Updating purchase project
        const { sellProject } = getState().form.vehicleState;

        const resultSellProject = await recordGateway.updateSellProject(
            config.identifier,
            recordId,
            sellProject,
        );

        if (isLeft(resultSellProject)) {
            return dispatch(dislayErrorUseCase('update_sell_project_failed'));
        }

        // create quotation
        const resultQuotation = await recordGateway.createQuotation(config.identifier, recordId);

        if (isLeft(resultQuotation)) {
            return dispatch(dislayErrorUseCase('create_quotation_failed'));
        }

        return dispatch(
            actionCreators.Actions.saveVehicleAndUserInformationsSaved(resultVehicle.right),
        );
    };
