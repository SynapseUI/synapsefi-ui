import React from 'react';
import { Modal } from 'package';

const SubModal = props => {
  const { isOpen, closeModal } = props;
  const btnObjs = [
    {
      text: 'Cancel',
      style: 'tertiary',
      onClick: () => closeModal(),
    },
    {
      text: 'Delete',
      style: 'remove',
      onClick: () => {
        const promise = new Promise((resolve, rejects) => {
          setTimeout(() => {
            resolve('yeah aaa ');
          }, 3000);
        });

        promise.then(data => {
          console.log('data: ', data);
          closeModal();
        });
      },
    },
  ];

  return (
    <div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        btnObjs={btnObjs}
        width="600px"
        height="200px"
        headerText="HEADER"
        fullWidthBtn
      >
        <div style={{ paddingRight: '16px' }}>Delete action cannot be undone.</div>
        <div style={{ paddingRight: '16px' }}>
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
          {`Pressing 'Delete' button will permanently delete the ${'aaa'} cip.`}
        </div>
      </Modal>
    </div>
  );
};

export default SubModal;
