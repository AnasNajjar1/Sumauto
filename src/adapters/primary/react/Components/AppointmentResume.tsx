import React from 'react';
import useTranslation from '../hooks/useTranslation';

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
}: TAppointmentResumeProps) => {
    const { t } = useTranslation();
    return (
        <div className="appointment-resume">
            <div className="appointment-resume-icon">
                <Picture background="icon-calendar" />
            </div>
            <div className="appointment-resume-text">
                <p className="mb-2">
                    <strong>{placeName}</strong>
                </p>
                <p>{date}</p>
                <p>{hour}</p>
                <p>{t('appointment_duration')}</p>
            </div>
        </div>
    );
};
