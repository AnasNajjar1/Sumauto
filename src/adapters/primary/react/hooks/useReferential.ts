import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReferentialList } from '../../../../hexagon/usecases/getReferentialList/getReferentialList';
import { setCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { getFilter } from '../../view-models-generators/referentialSelectors';

const useReferential = () => {
    const dispatch = useDispatch();
    const { filter } = useSelector(getFilter);

    useEffect(() => {
        dispatch(
            setCascade([
                'make',
                'model',
                'month',
                'year',
                'fuel',
                'body',
                'door',
                'gear',
                'engine',
                'version',
            ]),
        );

        dispatch(getReferentialList('make'));
    }, [dispatch]);
};

export default useReferential;
