import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';
import { TRecord } from '../../../../../hexagon/interfaces';
import { ActiveValuation } from './ActiveValuation';
import { ArchivedValuation } from './ArchivedValuation';
import { NoValuation } from './NoValuation';

export const Valuation: FunctionComponent<TRecord> = (props) => {
    const { valuation } = props;
    return (
        <div className="page page-quotation">
            <Container fluid>
                {valuation.status && (
                    <>
                        {valuation.archived ? (
                            <ArchivedValuation {...props} />
                        ) : (
                            <ActiveValuation {...props} />
                        )}
                    </>
                )}
                {valuation.status === false && <NoValuation {...props} />}
            </Container>
        </div>
    );
};
