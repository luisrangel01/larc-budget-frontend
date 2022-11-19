import React, { MouseEventHandler, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ConfirmProps = {
  title: string;
  body?: string;
  acceptText: string;
  showModal: boolean;
  handleClose: (result: { ok: boolean }) => void;
};

const Confirm = ({
  title,
  body,
  acceptText,
  showModal,
  handleClose,
}: ConfirmProps) => {
  const close = (e: any) => {
    handleClose({ ok: false });
  };

  const accept = (e: any) => {
    handleClose({ ok: true });
  };

  const hideModal = () => {
    handleClose({ ok: false });
  };

  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary" onClick={accept}>
            {acceptText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Confirm;
