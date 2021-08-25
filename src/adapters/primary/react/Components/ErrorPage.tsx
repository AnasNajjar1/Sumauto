import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { t } from 'autobiz-translate';
import './Themes/default.scss';

export const ErrorPage: FunctionComponent = () => {
    const { errorCode } = useParams<{ errorCode: string }>();

    return (
        <div className="page page-error">
            <Container fluid>
                <h1>{t('error_title')}</h1>
                {/* <h2>{errorCode}</h2> */}
                <p>{t('error_message')}</p>
            </Container>
        </div>
    );
};
