import React from 'react';
import { t } from 'autobiz-translate';
import { Col } from 'reactstrap';

type TIncitationProps = {
    top?: number;
};
export const Incitation: React.FC<TIncitationProps> = ({ top }: TIncitationProps) => (
    <div className="incitation" style={{ top }}>
        {top}
    </div>
);
