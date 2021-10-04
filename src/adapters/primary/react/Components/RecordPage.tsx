import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord.useCase';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { Loader } from './Loader';

import { ErrorPage } from './ErrorPage';
import { ArchivedValuation } from './ArchivedValuation';
import { ActiveValuation } from './ActiveValuation';
import { NoValuation } from './NoValuation';
import { Confirmation } from './Confirmation';

export const RecordPage: React.FC = () => {
    const dispatch = useDispatch();

    const { recordUid } = useParams<{ recordUid: string }>();

    useEffect(() => {
        dispatch(getRecordUseCase(recordUid, 'full'));
    }, [dispatch, recordUid]);

    const { data: record, status } = useSelector(getRecordSelector);

    if (status === 'failed') {
        return <ErrorPage />;
    }

    switch (record.offerStatus) {
        default:
        case 'UNQUOTABLE':
            return (
                <Loader status={status}>
                    <NoValuation {...record} />
                </Loader>
            );
        case 'CONFIRMED':
            return (
                <Loader status={status}>
                    <Confirmation {...record} />
                </Loader>
            );
        case 'EXPIRED':
            return (
                <Loader status={status}>
                    <ArchivedValuation {...record} />
                </Loader>
            );
        case 'NO_APPOINTMENT':
            return (
                <Loader status={status}>
                    <ActiveValuation {...record} />
                </Loader>
            );
    }
};
