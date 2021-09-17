import { isRight } from 'fp-ts/lib/Either';

import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { requestListUseCase } from '../setVehicleValue/setVehicleValue.useCase';
import * as actionCreators from './actionCreators';

export const getCarDetailsByRegistrationUseCase =
    (registration: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(actionCreators.Actions.carDetailsLoading());
        const { identifier } = getState().client.config;

        const result = await referentialGateway.requestCartDetailsByRegsitration(
            identifier,
            registration,
        );

        if (isRight(result)) {
            const {
                make,
                makeName,
                model,
                modelName,
                year,
                month,
                monthName,
                fuel,
                fuelName,
                body,
                bodyName,
                door,
                gear,
                gearName,
                engine,
            } = result.right;

            dispatch(
                actionCreators.Actions.setVehicleAll({
                    make,
                    model,
                    year,
                    month,
                    door,
                    fuel,
                    body,
                    engine,
                    gear,
                }),
            );
            dispatch(
                actionCreators.Actions.setVehicleNames({
                    make: makeName,
                    model: modelName,
                    year,
                    month: monthName,
                    fuel: fuelName,
                    body: bodyName,
                    door,
                    gear: gearName,
                    engine,
                }),
            );

            dispatch(requestListUseCase('version'));

            dispatch(actionCreators.Actions.carDetailsRetrieved());
        } else {
            dispatch(actionCreators.Actions.carDetailsFailed());
        }
    };
