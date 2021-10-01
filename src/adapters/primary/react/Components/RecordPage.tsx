import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { t } from 'autobiz-translate';

import { getRecordUseCase } from '../../../../hexagon/usecases/getRecord/getRecord.useCase';
import { getRecordSelector } from '../../view-models-generators/recordSelectors';
import { Loader } from './Loader';
import { getClientSelector } from '../../view-models-generators/clientSelector';

import { ErrorPage } from './ErrorPage';
import { ArchivedValuation } from './ArchivedValuation';
import { ActiveValuation } from './ActiveValuation';
import { NoValuation } from './NoValuation';
import { Confirmation } from './Confirmation';

export const RecordPage: React.FC = () => {
    const dispatch = useDispatch();

    const { recordId } = useParams<{ recordId: string }>();

    useEffect(() => {
        dispatch(getRecordUseCase(recordId, 'full'));
    }, [dispatch, recordId]);

    const { data: record, status } = useSelector(getRecordSelector);

    if (status === 'failed') {
        return <ErrorPage />;
    }

    if (record.valuation?.value) {
        if (record.appointment) {
            return (
                <Loader status={status}>
                    <Confirmation {...record} />
                </Loader>
            );
        }

        if (record.expired) {
            return (
                <Loader status={status}>
                    <ArchivedValuation {...record} />
                </Loader>
            );
        }

        return (
            <Loader status={status}>
                <ActiveValuation {...record} />
            </Loader>
        );
    }

    return (
        <Loader status={status}>
            <NoValuation {...record} />
        </Loader>
    );
};
