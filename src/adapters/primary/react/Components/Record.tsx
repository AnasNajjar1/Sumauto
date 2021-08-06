import React, { FunctionComponent, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router-dom';
import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { Loader } from './Loader';
import { Valuation } from './Valuation/Valuation';
import { t } from '../../../../hexagon/shared/utils/translate';

export const Record: FunctionComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { recordId } = useParams<{ recordId: string }>();

    const { data: record, status } = useSelector(getRecordSelector);

    const isVehicleQuoted = record?.valuation?.status;

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

            {/* {isVehicleQuoted && <>Hello quoted Vehicle</>} */}
        </Container>
    );
};
