import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { t } from 'autobiz-translate';
// import { t } from '../../../../hexagon/shared/utils/translate';
import './Themes/default/default.scss';
import { useSelector } from 'react-redux';
import { CtaBlock } from './CtaBlock';
import { getClientSelector } from '../../view-models-generators/clientSelector';

export const ErrorPage: FunctionComponent = () => {
    const { name, journeyType } = useSelector(getClientSelector).client;

    const history = useHistory();
    return (
        <div className="page page-error">
            <Container fluid>
                <h1>{t('error.title')}</h1>
                <p>{t('error.description')}</p>
                {name && journeyType && (
                    <CtaBlock>
                        <Button color="primary" onClick={() => history.push('/')}>
                            {t('error.cta')}
                        </Button>
                    </CtaBlock>
                )}
            </Container>
        </div>
    );
};
