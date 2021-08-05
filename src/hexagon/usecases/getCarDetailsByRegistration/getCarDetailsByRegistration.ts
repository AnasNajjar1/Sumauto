import { isRight } from 'fp-ts/lib/Either';

import { ThunkResult } from '../../../redux/configureStore';
import { ReferentialGateway } from '../../gateways/referentialGateway.interface';
import { QuestionKey } from '../../interfaces';
import { setVehicleValueCascade } from '../setVehicleValue/setVehicleValue';
import * as actionCreators from './actionCreators';

export const getCarDetailsByRegistrationUseCase =
    (registration: string): ThunkResult<void> =>
    async (
        dispatch,
        getState,
        { referentialGateway }: { referentialGateway: ReferentialGateway },
    ) => {
        dispatch(actionCreators.Actions.carDetailsLoading());

        const result = await referentialGateway.requestCartDetailsByRegsitration(registration);

        if (isRight(result)) {
            const {
                status,
                makeId,
                modelId,
                fuelId,
                bodyId,
                doors,
                gearboxId,
                engine,
                month,
                year,
            } = result.right;

            const displayQuestion = (question: QuestionKey) =>
                getState().client.config.questionsGroup.flat().includes(question);

            if (status) {
                if (displayQuestion('make'))
                    await dispatch(setVehicleValueCascade('make', makeId.toString()));
                if (displayQuestion('model'))
                    await dispatch(setVehicleValueCascade('model', modelId.toString()));
                if (displayQuestion('month'))
                    await dispatch(setVehicleValueCascade('month', month.toString()));
                if (displayQuestion('year'))
                    await dispatch(setVehicleValueCascade('year', year.toString()));
                if (displayQuestion('fuel'))
                    await dispatch(setVehicleValueCascade('fuel', fuelId.toString()));
                if (displayQuestion('body'))
                    await dispatch(setVehicleValueCascade('body', bodyId.toString()));
                if (displayQuestion('door'))
                    await dispatch(setVehicleValueCascade('door', doors.toString()));
                if (displayQuestion('gear'))
                    await dispatch(setVehicleValueCascade('gear', gearboxId.toString()));
                if (displayQuestion('engine'))
                    await dispatch(setVehicleValueCascade('engine', engine.toString()));
                dispatch(actionCreators.Actions.carDetailsRetrieved());
            } else {
                dispatch(actionCreators.Actions.carDetailsFailed());
            }
        } else {
            dispatch(actionCreators.Actions.carDetailsFailed());
        }
    };
