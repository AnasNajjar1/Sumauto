import { isRight } from 'fp-ts/lib/Either';
import { ThunkResult } from '../../../redux/configureStore';
import { RecordGateway } from '../../gateways/recordGateway.interface';
import * as actionCreators from './actionCreators';

export const saveVehicleAndUserInformations =
    (): ThunkResult<void> =>
    async (dispatch, getState, { recordGateway }: { recordGateway: RecordGateway }) => {
        dispatch(actionCreators.Actions.saveVehicleAndUserInformationsSaving());
        const { identifier } = getState().client;
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

        const resultUser = await recordGateway.saveUserInformation(identifier, {
            phone,
            email,
            zipCode,
        });
        const resultVehicle = await recordGateway.saveVehicleInformation(identifier, {
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

        const resultVehicleState = await recordGateway.saveVehicleStateInformation(identifier, {
            imported: imported === 'Y',
            service_history: history === 'Y',
            running: running === 'Y' ? 1 : 0,
        });

        if (isRight(resultUser) && isRight(resultVehicle) && isRight(resultVehicleState)) {
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsSaved(resultUser.right));
        } else {
            dispatch(actionCreators.Actions.saveVehicleAndUserInformationsFailed());
        }
    };
