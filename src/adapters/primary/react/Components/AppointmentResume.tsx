import React from 'react';

import moment from 'moment';
import { t } from 'autobiz-translate';
import { Picture } from './Picture';

type TAppointmentResumeProps = {
    date: string;
    hour: string;
    placeName: string;
};
export const AppointmentResume: React.FC<TAppointmentResumeProps> = ({
    date,
    hour,
    placeName,
}: TAppointmentResumeProps) => (
    <div className="appointment-resume">
        <div className="appointment-resume-icon">
            <Picture background="icon-calendar" />
        </div>
        <div className="appointment-resume-text">
            <p className="mb-2">
                <strong>{placeName}</strong>
            </p>
            <p>{moment(date).format('dddd l')}</p>
            <p>{t('appointment_duration')}</p>
        </div>
    </div>
);
