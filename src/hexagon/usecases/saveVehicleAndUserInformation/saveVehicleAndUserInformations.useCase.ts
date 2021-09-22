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

        let recordId;
        if (isRight(resultVehicle)) {
            recordId = resultVehicle.right.id;
        } else {
            dispatch(dislayErrorUseCase('create_record_failed'));
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
            return;
        }

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
            dispatch(dislayErrorUseCase('create_state_failed'));
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
        }

        // saving user information
        const { email, phone, zipCode } = getState().form.particular;

        const resultUser = await recordGateway.saveUserInformation(config.identifier, recordId, {
            phone,
            email,
            zipCode,
        });

        if (isRight(resultUser)) {
            dispatch(getRecordUseCase(recordId.toString()));
            dispatch(
                actionCreators.Actions.saveVehicleAndUserInformationsSaved(resultVehicle.right),
            );
        } else {
            dispatch(dislayErrorUseCase('create_particular_failed'));
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
        }

        // Updating purchase project
    };
