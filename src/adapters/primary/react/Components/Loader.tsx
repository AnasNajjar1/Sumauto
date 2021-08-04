import React from 'react';
import { Spinner } from 'reactstrap';

import { FetchStatus } from '../../../../redux/appState';

type LoaderProps = {
    status: FetchStatus;
    children: React.ReactNode;
};

export const Loader: React.FC<LoaderProps> = ({ status, children }: LoaderProps) => {
    switch (status) {
        case 'loading':
            return (
                <div className="m-3 text-center">
                    <Spinner />
                </div>
            );
            break;

        default:
            return <>{children}</>;
            break;
    }
};
