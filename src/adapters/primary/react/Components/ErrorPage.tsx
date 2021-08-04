import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import './Themes/default.scss';

export const ErrorPage: FunctionComponent = () => {
    const { errorCode } = useParams<{ errorCode: string }>();

    return (
        <Container fluid className="text-center">
            <h1>Oops!</h1>
            <h2>{errorCode}</h2>
            <div>Sorry, an error has occured</div>
        </Container>
    );
};
