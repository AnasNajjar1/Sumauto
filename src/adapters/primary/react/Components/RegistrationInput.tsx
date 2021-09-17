import React, { FunctionComponent, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, Spinner } from 'reactstrap';

import { t } from 'autobiz-translate';
import { getClientSelector } from '../../view-models-generators/clientSelector';
import { dislayErrorUseCase } from '../../../../hexagon/usecases/displayError/displayError.useCase';
import { getCarDetailsByRegistrationUseCase } from '../../../../hexagon/usecases/getCarDetailsByRegistration/getCarDetailsByRegistration.useCase';
import { getRegistrationSelector } from '../../view-models-generators/registrationSelector';

export const RegistrationInput: FunctionComponent = () => {
    const dispatch = useDispatch();

    const { config } = useSelector(getClientSelector);
    const { status } = useSelector(getRegistrationSelector);

    const [registration, setRegistration] = useState('5380FTL'); //

    const submitingRegistration = () => {
        if (registration.search(new RegExp(config.registrationRegex)) === 0) {
            dispatch(getCarDetailsByRegistrationUseCase(registration));
        } else {
            dispatch(dislayErrorUseCase(`<p>${t('the_registration_number_is_invalid')}</p>`));
        }
    };

    const handleClickOk = () => {
        submitingRegistration();
    };
    const handleKeyDown = (key: string) => {
        if (key === 'Enter') {
            submitingRegistration();
        }
    };

    return (
        <>
            <FormGroup className="form-group-registration">
                <Label>
                    {t('registration')} {status === 'pending' && <Spinner size="sm" />}
                </Label>
                <InputGroup>
                    <Input
                        invalid={status === 'failed'}
                        value={registration}
                        placeholder={t('registration_placeholder')}
                        onChange={(e) => setRegistration(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e.key)}
                    />

                    <InputGroupAddon addonType="append">
                        <Button
                            color="primary"
                            onClick={handleClickOk}
                            disabled={registration.length === 0}
                        >
                            {t('OK')}
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
        </>
    );
};
