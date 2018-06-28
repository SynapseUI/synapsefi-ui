import React from 'react';
import ModalContent from './ModalContent';

const Modal = props => {
  return props.isOpen ? <ModalContent {...props} /> : null;
};

export default Modal;
