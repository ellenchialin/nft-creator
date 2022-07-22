// prettier-ignore
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const AlertModal = ({ isAlertOpen, onAlertClose, header, body }) => {
  return (
    <Modal isOpen={isAlertOpen} onClose={onAlertClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button onClick={onAlertClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;
