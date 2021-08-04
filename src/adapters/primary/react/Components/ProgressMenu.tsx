import React from 'react';
import { Progress } from 'reactstrap';
import { t } from '../../../../hexagon/shared/utils/translate';

type ProgressMenuProps = {
    step: number;
    progress: number;
};

export const ProgressMenu: React.FC<ProgressMenuProps> = ({
    step,
    progress,
}: ProgressMenuProps) => (
    <div className="progress-menu">
        <ul>
            <li className={step > 1 ? 'completed' : ''}>{t('your_vehicle')}</li>
            <li className={step > 2 ? 'completed' : ''}>{t('your_profile')}</li>
            <li className={step > 3 ? 'completed' : ''}>{t('estimation')}</li>
            <li className={step > 4 ? 'completed' : ''}>{t('your_appointment')}</li>
        </ul>
        <Progress value={progress} />
    </div>
);
