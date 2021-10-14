import React, { useEffect, useState } from 'react';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { t } from 'autobiz-translate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { InputWithValidation } from './InputWithValidation';
import { InputValidation } from './InputValidation';
import { setParticularValue } from '../../../../hexagon/usecases/setParticularValue/setParticularValue.useCase';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { getFormSelector } from '../../view-models-generators/formSelectors';
import { checkZipcodeUseCase } from '../../../../hexagon/usecases/checkZipCode/checkZipcode.useCase';
import { getCheckZipCodeSelector } from '../../view-models-generators/checkZipCodeSelector';

type ZipCodeInputProps = {
    error: boolean;
};

export const ZipCodeInput: React.FC<ZipCodeInputProps> = ({ error }) => {
    const dispatch = useDispatch();

    const { config } = useSelector(getClientSelector);
    const { particular } = useSelector(getFormSelector);
    const [zipCode, setZipCode] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);
    const [valid, setValid] = useState<boolean>(false);

    useEffect(() => {
        setZipCode(particular.zipCode);
    }, [dispatch]);

    const { checkZipCode } = useSelector(getCheckZipCodeSelector);

    const handleChange = (value: string) => {
        if (value.search(new RegExp(config.zipCodeRegex)) === 0) {
            setValid(true);
        } else {
            setValid(false);
        }

        if (value.length <= 5) {
            setZipCode(value);
            setTouched(true);
        }
    };

    const handleBlur = (value: string) => {
        if (value.search(new RegExp(config.zipCodeRegex)) === 0) {
            setValid(true);
        } else {
            setValid(false);
        }
    };

    useEffect(() => {
        if (valid) dispatch(checkZipcodeUseCase(zipCode));
    }, [zipCode, valid]);

    useEffect(() => {
        if (error) {
            setValid(false);
            setTouched(true);
        }
    }, [error]);

    useEffect(() => {
        if (checkZipCode) {
            dispatch(setParticularValue('zipCode', zipCode));
        } else {
            dispatch(setParticularValue('zipCode', ''));
        }
    }, [dispatch, checkZipCode, zipCode]);

    return (
        <>
            <FormGroup className="form-group-zipCode" id="form_group_zipCode">
                <Label for="zipCode">{t('zipCode')}</Label>
                <InputWithValidation>
                    <InputGroup>
                        <Input
                            type="tel"
                            id="zipCode"
                            value={zipCode}
                            placeholder={t('zipCode_placeholder')}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={(e) => handleBlur(e.target.value)}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    {(touched && <InputValidation valid={valid && checkZipCode} />) || (
                        <InputValidation valid={undefined} />
                    )}
                </InputWithValidation>
            </FormGroup>
        </>
    );
};
