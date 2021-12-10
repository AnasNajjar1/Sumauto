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
import useScroll from '../hooks/useScroll';
import { NotRolling } from './NotRolling';

export const RecordPage: React.FC = () => {
    const dispatch = useDispatch();
    const { scrollToElement } = useScroll();

    const { recordUid } = useParams<{ recordUid: string }>();

    useEffect(() => {
        dispatch(getRecordUseCase(recordUid, 'full'));
    }, [dispatch, recordUid]);

    const { data: record, status } = useSelector(getRecordSelector);

    useEffect(() => {
        if (status === 'succeeded') scrollToElement('top');
    }, [dispatch, status]);

    if (status === 'failed') {
        return <ErrorPage />;
    }

    let component;
    switch (record.offerStatus) {
        default:
        case 'UNQUOTABLE':
            component = <NoValuation {...record} />;
            break;

        case 'CONFIRMED':
            component = <Confirmation {...record} />;
            break;

        case 'EXPIRED':
            component = <ArchivedValuation {...record} />;
            break;

        case 'NO_APPOINTMENT':
            component = <ActiveValuation {...record} />;
            break;

        case 'NOT_ROLLING':
            component = <NotRolling {...record} />;
            break;
    }

    return (
        <div id="top">
            <Loader status={status}>{component}</Loader>
        </div>
    );
};
