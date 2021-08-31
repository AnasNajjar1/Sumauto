import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { hideErrorUseCase } from '../../../../hexagon/usecases/displayError/displayError.useCase';
import { getErrorSelector } from '../../view-models-generators/errorSelector';

const ErrorModal = () => {
    const dispatch = useDispatch();
    const error = useSelector(getErrorSelector);

    const hide = () => {
        dispatch(hideErrorUseCase());
    };

    return (
        <div>
            <Modal isOpen={error.show} toggle={hide}>
                <ModalHeader toggle={hide} />
                <ModalBody>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: error.description ? error.description : '',
                        }}
                    />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ErrorModal;
