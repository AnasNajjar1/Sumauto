import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';
import { TRecord } from '../../../../../hexagon/interfaces';
import { t } from '../../../../../hexagon/shared/utils/translate';
import { ActiveValuation } from './ActiveValuation';
import { ArchivedValuation } from './ArchivedValuation';
import { NoValuation } from './NoValuation';

export const Valuation: FunctionComponent<TRecord> = (props) => {
    const { valuation } = props;
    return (
        <Container fluid>
            {valuation.status && (
                <>
                    <h3>{t('we_make_an_appointment')}</h3>
                    {valuation.archived ? (
                        <ArchivedValuation {...props} />
                    ) : (
                        <ActiveValuation {...props} />
                    )}
                </>
            )}
            {valuation.status === false && <NoValuation {...props} />}
        </Container>
    );
};
