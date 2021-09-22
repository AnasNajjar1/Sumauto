import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { t } from 'autobiz-translate';
import '../Themes/default/default.scss';
import { useSelector } from 'react-redux';
import { CtaBlock } from './CtaBlock';
import { getClientSelector } from '../../view-models-generators/clientSelector';

type TErrorPageProps = {
    title?: string;
    description?: string;
};

export const ErrorPage: React.FC<TErrorPageProps> = ({ title, description }) => {
    const { name, journeyType } = useSelector(getClientSelector).client;

    const history = useHistory();
    return (
        <div className="page page-error">
            <Container fluid>
                <h1>{t(title || 'error_title')}</h1>

                <div
                    dangerouslySetInnerHTML={{
                        __html: t(description || 'error_description_html') || '',
                    }}
                />

                {name && journeyType && (
                    <CtaBlock>
                        <Button color="primary" onClick={() => history.push('/')}>
                            {t('error_cta')}
                        </Button>
                    </CtaBlock>
                )}
            </Container>
        </div>
    );
};
