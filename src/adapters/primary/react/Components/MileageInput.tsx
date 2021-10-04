import React, { useEffect, useState } from 'react';
import {
    Col,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { t } from 'autobiz-translate';
import { InputWithValidation } from './InputWithValidation';
import { setVehicleValueCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { InputValidation } from './InputValidation';
import { Message } from './Message';

export const MileageInput: React.FC = () => {
    const dispatch = useDispatch();

    const [mileage, setMileage] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [displayWarning, setDisplayWarning] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>();

    const isMileageInconsistent = (year: number, month: number, kilometers: string) => {
        const mileageNumber = Number(kilometers);
        const registrationDate = new Date(year, Number(month), 1, 0, 0, 0);
        const today = new Date();
        const currentTime = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds(),
        );

        const age =
            Math.round(
                (currentTime.getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24 * 365),
            ) * 12;
        if (
            (mileageNumber / age) * 12 > 30000 ||
            mileageNumber > 350000 ||
            (mileageNumber / age) * 12 < 5000
        ) {
            return true;
        }
        return false;
    };

    const warning = () => {
        if (isMileageInconsistent(2017, 6, mileage)) setDisplayWarning(true);
        else setDisplayWarning(false);
    };

    const handleChange = (value: string) => {
        const re = /^[0-9\b]+$/;

        if (value === '' || re.test(value)) {
            setMileage(value);
        }

        if (touched) warning();
    };

    const handleBlur = () => {
        warning();

        setTouched(true);
        dispatch(setVehicleValueCascade('mileage', mileage));
    };

    useEffect(() => {
        if (mileage === '') {
            setDisplayWarning(false);
        }

        if (touched && mileage !== '') {
            setValid(true);
        }

        if (touched && mileage === '') {
            setValid(false);
        }
    }, [dispatch, mileage, touched]);

    return (
        <>
            <Row>
                <Col xs={12} sm={5} lg={3}>
                    <FormGroup className="form-group-mileage" id="form_group_mileage">
                        <Label for="mileage">{t('mileage')}</Label>
                        <InputWithValidation>
                            <InputGroup>
                                <Input
                                    type="tel"
                                    id="mileage"
                                    value={mileage}
                                    onChange={(e) => handleChange(e.target.value)}
                                    onBlur={() => handleBlur()}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>Km</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <InputValidation valid={valid} />
                        </InputWithValidation>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8}>
                    <Message
                        className="warning"
                        display={displayWarning}
                        title={t('mileage_warning')?.replace('[MILEAGE]', mileage)}
                    />
                </Col>
            </Row>
        </>
    );
};
