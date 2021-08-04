import React, { FunctionComponent, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FormGroup, Label, Input, InputGroup, InputGroupAddon, Button, Spinner } from 'reactstrap';

import config from '../../../../../config/unoauto';
import { ReferentialItem } from '../../../../../hexagon/interfaces';
import { t } from '../../../../../hexagon/shared/utils/translate';
import { showError } from '../../../../../hexagon/usecases/displayError/displayError';
import { getCarDetailsByRegistrationUseCase } from '../../../../../hexagon/usecases/getCarDetailsByRegistration/getCarDetailsByRegistration';
import { setVehicleValue } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue';
import { getClientSelector } from '../../../view-models-generators/clientSelector';
import { getRegistrationSelector } from '../../../view-models-generators/registrationSelector';

type RegistrationInputProps = {
    id: ReferentialItem;
    value: string;
    required: boolean;
    text: {
        label?: string;
        placeholder?: string;
        help?: string;
    };
};

export const RegistrationInput: FunctionComponent<RegistrationInputProps> = ({
    id,
    value,
    text,
    required,
}) => {
    const dispatch = useDispatch();

    const [registration, setRegistration] = useState(value || '');

    const { status } = useSelector(getRegistrationSelector);

    const { client } = useSelector(getClientSelector);
    const { registrationRegex } = client.config;

    const submitingRegistration = () => {
        if (registration.search(new RegExp(registrationRegex)) === 0) {
            dispatch(setVehicleValue('registration', registration));
            dispatch(getCarDetailsByRegistrationUseCase(registration));
        } else {
            dispatch(showError("<p>Le numéro d'immatriculation est invalide</p>"));
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
            <div className={`question question-${id}`}>
                <FormGroup>
                    <Label>
                        {text.label} {required && '*'}
                        {status === 'loading' && <Spinner size="sm" />}
                    </Label>
                    <InputGroup>
                        <Input
                            invalid={status === 'failed'}
                            value={registration}
                            placeholder={text.placeholder}
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
            </div>
            <hr />
        </>
    );
};
