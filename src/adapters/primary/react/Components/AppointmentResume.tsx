import React from 'react';
import { t } from 'autobiz-translate';
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
            <p className="font-weight-bold">
                {t('point_of_sale')} {placeName}
            </p>
            <p>
                {moment(date).format('LLLL')}
                <br />
                {t('sell_duration')}
            </p>
        </div>
    </div>
);
