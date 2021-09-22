import React from 'react';
import { Spinner } from 'reactstrap';
import { TActionStatus } from '../../../../redux/appState';

type TLoaderProps = {
    status: TActionStatus;
    children: React.ReactNode;
};

export const Loader: React.FC<TLoaderProps> = ({ status, children }: TLoaderProps) => {
    switch (status) {
        default:
        case 'idle':
            return <></>;

        case 'pending':
            return (
                <div className="m-3 text-center">
                    <Spinner />
                </div>
            );

        case 'succeeded':
            return <>{children}</>;
    }
};
