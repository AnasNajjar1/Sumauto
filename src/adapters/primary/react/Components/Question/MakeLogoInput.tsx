import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';
import { QuestionKey } from '../../../../../hexagon/interfaces';
import { setVehicleValueCascade } from '../../../../../hexagon/usecases/setVehicleValue/setVehicleValue.useCase';

type MakeLogoInputProps = {
    id: QuestionKey;
    value: string;
    list: any;
    text?: {
        label?: string;
    };
};

export const MakeLogoInput: FunctionComponent<MakeLogoInputProps> = ({ id, value, list, text }) => {
    const dispatch = useDispatch();

    return (
        <>
            <Col>
                <div className="registration-or-make-logo">
                    <span>{t('or')}</span>
                </div>
            </Col>

            <div className={`question question-${id}`}>
                <Row>
                    {list.map((f: any) => (
                        <div className="logo-button-container" key={f.id}>
                            <div
                                role="button"
                                aria-hidden
                                onClick={() =>
                                    dispatch(setVehicleValueCascade('make', f.id.toString()))
                                }
                                className={value === f.id.toString() ? 'selected' : ''}
                            >
                                <img
                                    src={`https://b2b-pictures-prod.s3-eu-west-1.amazonaws.com/brandsLogos/${f.name}.jpg`}
                                    alt={f.name}
                                />
                            </div>
                            {f.name}
                        </div>
                    ))}
                </Row>
            </div>
        </>
    );
};
