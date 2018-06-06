import React, { Component } from 'react';
import { range } from 'lodash';
import { Modal, Button } from 'package';

class JsxModalWithBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  handlePrimaryBtnClick() {
    window.alert('primary btn clicked');
  }

  renderModal() {
    const btnObjs = [
      {
        text: 'Remove',
        size: 'large',
        style: 'remove',
      },
      {
        text: 'Secondary',
        style: 'secondary',
        onClick: () => window.alert('secondary btn clicked'),
      },
      {
        text: 'primary btn',
        onClick: this.handlePrimaryBtnClick,
      },
    ];

    return (
      <Modal
        isOpen={this.state.isOpen}
        closeModal={this.closeModal}
        headerText={'I am a Header'}
        height={'500px'}
        width={'700px'}
        btnObjs={btnObjs}
        fullWidthBtn
      >
        <div>contents</div>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <Button medium onClick={this.openModal}>
          Modal w Btns
        </Button>
        {this.renderModal()}
      </div>
    );
  }
}

export default JsxModalWithBtn;