import React from 'react';
import { t } from 'autobiz-translate';
// import { t } from '../../../../hexagon/shared/utils/translate';

import moment from 'moment';
import { Picture } from './Picture';

type TAppointmentResumeProps = {
    date: Date;
    placeName: string;
};
export const AppointmentResume: React.FC<TAppointmentResumeProps> = ({
    date,
    placeName,
}: TAppointmentResumeProps) => (
    <div className="appointment-resume">
        <div className="appointment-resume-icon">
            <Picture background="icon-calendar" />
        </div>
        <div className="appointment-resume-text">
            <p>
                {moment(date).format('dddd l')}
                <br />
                {t('sell_duration')}
            </p>
            <p>
                {t('point_of_sale')} {placeName}
            </p>
        </div>
    </div>
);
