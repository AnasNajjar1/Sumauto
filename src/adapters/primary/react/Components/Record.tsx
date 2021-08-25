import React, { FunctionComponent, useEffect } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { t } from 'autobiz-translate';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { Loader } from './Loader';
import { Valuation } from './Valuation/Valuation';
import { Appointment } from './Appointment';

export const Record: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { recordId } = useParams<{ recordId: string }>();

    const { data: record, status } = useSelector(getRecordSelector);

    const canMakeAnAppointment = record?.valuation?.status && record?.valuation?.archived === false;
    const history = useHistory();
    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    if (status === 'failed') {
        history.push('/error/404');
    }

    return (
        <Container fluid>
            {record?.valuation && (
                <Loader status={status}>
                    <Valuation {...record} />
                </Loader>
            )}
            {canMakeAnAppointment && record.customer.zipCode && (
                <Appointment recordId={recordId} zipCode={record.customer.zipCode} />
            )}
        </Container>
    );
};
