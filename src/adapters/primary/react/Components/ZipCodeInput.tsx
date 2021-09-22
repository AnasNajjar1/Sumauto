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

export const ZipCodeInput: React.FC = () => {
    const dispatch = useDispatch();

    const { particular } = useSelector(getFormSelector);
    const [zipCode, setZipCode] = useState<string>('');
    const [touched, setTouched] = useState<boolean>(false);

    useEffect(() => {
        setZipCode(particular.zipCode);
    }, [dispatch]);

    const { checkZipCode } = useSelector(getCheckZipCodeSelector);

    const handleBlur = (value: string) => {
        setZipCode(value);
        setTouched(true);
        dispatch(checkZipcodeUseCase(value));
    };

    useEffect(() => {
        if (checkZipCode) dispatch(setParticularValue('zipCode', zipCode));
        else dispatch(setParticularValue('zipCode', ''));
    }, [dispatch, checkZipCode, zipCode]);

    return (
        <>
            <FormGroup className="form-group-zipCode">
                <Label for="zipCode">{t('zipCode')}</Label>
                <InputWithValidation>
                    <InputGroup>
                        <Input
                            type="tel"
                            id="zipCode"
                            defaultvalue={zipCode}
                            onBlur={(e) => handleBlur(e.target.value)}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    {(touched && <InputValidation valid={checkZipCode} />) || (
                        <InputValidation valid={undefined} />
                    )}
                </InputWithValidation>
            </FormGroup>
        </>
    );
};
