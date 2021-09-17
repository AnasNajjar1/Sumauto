import React, { FunctionComponent, useEffect, useState } from 'react';
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

export const ZipCodeInput: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { particular } = useSelector(getFormSelector);

    const [zipCode, setZipCode] = useState<string>('');
    const [valid, setValid] = useState<boolean>();

    useEffect(() => {
        setZipCode(particular.zipCode);
    }, [dispatch]);

    const { config } = useSelector(getClientSelector);

    const handleChange = (value: string) => {
        if (value.search(new RegExp(config.zipCodeRegex)) === 0) {
            setValid(true);
        } else {
            setValid(false);
        }
        setZipCode(value);
    };

    const handleBlur = () => {
        if (valid) {
            dispatch(setParticularValue('zipCode', zipCode));
        } else {
            dispatch(setParticularValue('zipCode', ''));
        }
    };

    return (
        <>
            <FormGroup className="form-group-zipCode">
                <Label for="zipCode">{t('zipCode')}</Label>
                <InputWithValidation>
                    <InputGroup>
                        <Input
                            type="text"
                            id="zipCode"
                            value={zipCode}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => handleBlur()}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <InputValidation valid={valid} />
                </InputWithValidation>
            </FormGroup>
        </>
    );
};
