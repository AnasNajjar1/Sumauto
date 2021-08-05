import React, { FunctionComponent, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { Loader } from './Loader';
import { Valuation } from './Valuation';

export const Record: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { recordId } = useParams<{ recordId: string }>();

    const { data: record, status } = useSelector(getRecordSelector);

    const isVehicleQuoted = record?.valuation?.status;

    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);
    return (
        <Container fluid>
            <Loader status={status}>
                <Valuation {...record} />
            </Loader>

            {isVehicleQuoted && <>Hello quoted Vehicle</>}
        </Container>
    );
};
