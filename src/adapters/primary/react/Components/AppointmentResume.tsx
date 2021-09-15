import React from 'react';

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
            <p>{moment(date).format('dddd l')}</p>
            <p>{placeName}</p>
        </div>
    </div>
);
