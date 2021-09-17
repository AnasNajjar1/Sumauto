import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { t } from 'autobiz-translate';

import { QuestionKey } from '../../../../../hexagon/interfaces';

type MakeLogoInputProps = {
    id: QuestionKey;
    value: string;
    list: any;
    text?: {
        label?: string;
    };
};

const getMakeLogoUrl = (name: string) => {
    const brand_image = `https://b2b-pictures-prod.s3-eu-west-1.amazonaws.com/brandsLogos/${name.replace(
        / /g,
        '_',
    )}.jpg`;
    return brand_image;
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
                                className={value === f.id.toString() ? 'selected' : ''}
                            >
                                <img src={getMakeLogoUrl(f.name)} alt={f.name} />
                            </div>
                            {f.name}
                        </div>
                    ))}
                </Row>
            </div>
        </>
    );
};
