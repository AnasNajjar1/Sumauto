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
                {withLabels && t('your_vehicle')}
            </li>
            <li className={currentStep > 2 ? 'completed' : ''}>
                {withLabels && t('your_profile')}
            </li>
            <li className={currentStep > 3 ? 'completed' : ''}>{withLabels && t('estimation')}</li>
            <li className={currentStep > 4 ? 'completed' : ''}>
                {withLabels && t('your_appointment')}
            </li>
        </ul>
        <Progress value={progress} />
    </div>
);
