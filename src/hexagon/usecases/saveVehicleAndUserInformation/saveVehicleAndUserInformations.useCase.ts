import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import * as actionCreators from './actionCreators';

export const saveVehicleAndUserInformationsUseCase =
    (): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.saveVehicleAndUserInformationsSaving());
        const { config } = getState().client;
        const {
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
            phone,
            email,
            zipCode,
            imported,
            history,
            running,
        } = getState().form.vehicle;

        const resultUser = await recordGateway.saveUserInformation(config.identifier, {
            phone,
            email,
            zipCode,
        });
        const resultVehicle = await recordGateway.saveVehicleInformation(config.identifier, {
            makeId: Number(make),
            modelId: Number(model),
            month: Number(month),
            year: Number(year),
            fuelId: Number(fuel),
            bodyId: Number(body),
            doors: Number(door),
            gearId: Number(gear),
            engine: Number(engine),
            versionId: Number(version),
            mileage: Number(mileage),
        });

        const resultVehicleState = await recordGateway.saveVehicleStateInformation(
            config.identifier,
            {
                imported: imported === 'Y',
                service_history: history === 'Y',
                running: running === 'Y',
            },
        );

        if (isRight(resultUser) && isRight(resultVehicle) && isRight(resultVehicleState)) {
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsSaved(resultUser.right));
        } else {
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
        }
    };
