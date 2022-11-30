import Toast from "react-bootstrap/Toast";

type WarningMessageProps = {
  showMessage: boolean;
  toggleShowMessage: any;
  title: string;
  message: string;
};

const WarningMessage = ({
  showMessage,
  toggleShowMessage,
  title,
  message,
}: WarningMessageProps) => {
  return (
    <Toast
      show={showMessage}
      onClose={toggleShowMessage}
      delay={3000}
      autohide
      bg="warning"
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>
        <strong>{message}</strong>
      </Toast.Body>
    </Toast>
  );
};

export default WarningMessage;
