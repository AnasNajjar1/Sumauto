import React, { FunctionComponent, useEffect } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
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

    useEffect(() => {
        dispatch(getRecordUseCase(recordId));
    }, [dispatch, recordId]);

    if (status === 'failed') {
        return (
            <Container fluid>
                <p className="text-center">{t('unknown_record')}</p>
            </Container>
        );
    }

    return (
        <Container fluid>
            {record?.valuation && (
                <Loader status={status}>
                    <Valuation {...record} />
                </Loader>
            )}

            {canMakeAnAppointment && record.customer.zipCode && (
                <Appointment zipCode={record.customer.zipCode} />
            )}
        </Container>
    );
};
