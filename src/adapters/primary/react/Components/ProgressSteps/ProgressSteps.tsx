import React from 'react';
import { t } from 'autobiz-translate';
import { Progress } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

type TProgressStepsProps = {
    withLabels: boolean;
    progress: number;
};
export const ProgressSteps: React.FC<TProgressStepsProps> = ({
    withLabels,
    progress,
}: TProgressStepsProps) => {
    let class1;
    let class2;
    let class3;
    let class4;
    if (progress === 100) {
        class1 = 'completed';
        class2 = 'completed';
        class3 = 'completed';
        class4 = 'completed';
    } else if (progress > 66) {
        class1 = 'completed';
        class2 = 'completed';
        class3 = 'active';
        class4 = '';
    } else if (progress > 33) {
        class1 = 'completed';
        class2 = 'active';
        class3 = '';
        class4 = '';
    } else {
        class1 = 'active';
        class2 = '';
        class3 = '';
        class4 = '';
    }

    return (
        <div className="progress-steps">
            <div className="progress-step-content">
                <div className="step">
                    {withLabels && (
                        <div className={`label ${class1}`}>{t('basic_information')}</div>
                    )}
                    <div className={`number ${class1}`}>
                        {class1 === 'completed' ? <FontAwesomeIcon icon={faCheck} /> : '1'}
                    </div>
                </div>
                <div className="step">
                    {withLabels && <div className={`label ${class2}`}>{t('more_details')}</div>}
                    <div className={`number ${class2}`}>
                        {class2 === 'completed' ? <FontAwesomeIcon icon={faCheck} /> : '2'}
                    </div>
                </div>
                <div className="step">
                    {withLabels && (
                        <div className={`label ${class3}`}>{t('additional_information')}</div>
                    )}
                    <div className={`number ${class3}`}>
                        {class3 === 'completed' ? <FontAwesomeIcon icon={faCheck} /> : '3'}
                    </div>
                </div>
                <div className="step">
                    {withLabels && <div className={`label ${class4}`}>{t('car_valuation')}</div>}
                    <div className={`number ${class4}`}>
                        {class4 === 'completed' ? <FontAwesomeIcon icon={faCheck} /> : '4'}
                    </div>
                </div>
            </div>
            <Progress value={progress} />
        </div>
    );
};
