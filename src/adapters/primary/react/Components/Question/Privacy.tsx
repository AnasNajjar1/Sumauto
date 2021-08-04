import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue';

export const Privacy: FunctionComponent = () => {
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        dispatch(setVehicleValue('privacy', checked ? '' : 'Y'));
        setChecked(!checked);
    };

    return (
        <Col xs={12}>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" onChange={() => handleChange()} /> He leido la Politica
                    de privacidad
                </Label>
            </FormGroup>
        </Col>
    );
};
