import React from 'react';
import { Row } from 'reactstrap';

type TFeatureGroupProps = {
    children: React.ReactNode;
};
export const FeatureGroup: React.FC<TFeatureGroupProps> = ({ children }: TFeatureGroupProps) => (
    <div className="feature-group">
        <Row>{children}</Row>
    </div>
);
