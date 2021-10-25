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
import { useDispatch, useSelector } from 'react-redux';
import { InputWithValidation } from './InputWithValidation';
import { setVehicleValueCascade } from '../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';
import { InputValidation } from './InputValidation';
import { Message } from './Message';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import useTranslation from '../hooks/useTranslation';

type MileageInputProps = {
    error: boolean;
};

export const MileageInput: React.FC<MileageInputProps> = ({ error }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { vehicle } = useSelector(getFormSelector);

    const [mileage, setMileage] = useState<string>('');
    const [touched, setTouched] = useState<boolean>();
    const [displayWarning, setDisplayWarning] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>();

    const isMileageInconsistent = (year: number, month: number, kilometers: string) => {
        const mileageNumber = Number(kilometers);
        const registrationDate = new Date(year, Number(month - 1), 1, 0, 0, 0);

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
        if (mileage && isMileageInconsistent(vehicle.year, vehicle.month, mileage))
            setDisplayWarning(true);
        else setDisplayWarning(false);
    };

    const handleChange = (value: string) => {
        value = value.replace('.', '');

        if (Number(value) <= 999999) setMileage(value);
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

        if (touched) warning();

        if (touched && mileage !== '') {
            setValid(true);
        }

        if (touched && mileage === '') {
            setValid(false);
        }
    }, [dispatch, mileage, touched]);

    useEffect(() => {
        if (error) setValid(false);
    }, [dispatch, error]);

    let formatedValue: string = new Intl.NumberFormat('es-ES').format(Number(mileage));
    if (formatedValue === '0') formatedValue = '';

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
                                    placeholder={t('mileage_placeholder')}
                                    value={formatedValue}
                                    onChange={(e) => handleChange(e.target.value)}
                                    onBlur={() => handleBlur()}
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>km</InputGroupText>
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
                        title={t('mileage_warning')?.replace('[MILEAGE]', formatedValue)}
                    />
                </Col>
            </Row>
        </>
    );
};
