import React from 'react';
import { t } from 'autobiz-translate';
import { Progress } from 'reactstrap';

type TProgressStepsProps = {
    currentStep: number;
    withLabels: boolean;
    progress: number;
};
export const ProgressSteps: React.FC<TProgressStepsProps> = ({
    currentStep,
    withLabels,
    progress,
}: TProgressStepsProps) => (
    <div className="progress-steps">
        <ul>
            <li className={currentStep > 1 ? 'completed' : ''}>
                {withLabels && t('basic_information')}
            </li>
            <li className={currentStep > 2 ? 'completed' : ''}>
                {withLabels && t('more_details')}
            </li>
            <li className={currentStep > 3 ? 'completed' : ''}>
                {withLabels && t('additional_information')}
            </li>
            <li className={currentStep > 4 ? 'completed' : ''}>
                {withLabels && t('car_valuation')}
            </li>
        </ul>
        <div>{currentStep}</div>
        <Progress value={progress} />
    </div>
);
