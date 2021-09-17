import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { t } from 'autobiz-translate';

import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';

export const Privacy: FunctionComponent = () => {
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        // dispatch(setVehicleValue('privacy', checked ? '' : 'Y'));
        setChecked(!checked);
    };

    return (
        <Col xs={12}>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" onChange={() => handleChange()} />{' '}
                    {t('i_have_read_the_policy_of_privacy')}
                </Label>
            </FormGroup>
        </Col>
    );
};
