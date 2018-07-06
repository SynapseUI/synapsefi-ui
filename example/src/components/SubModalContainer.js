import React, { Component } from 'react';
import { Modal, Button } from 'package';
import SubModal from './SubModal';

const font = { fontSize: '20px' };
const bold = { ...font, fontWeight: 'bold' };

class ExampleModalBasic extends Component {
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

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Open Basic Modal</Button>
        <SubModal isOpen={this.state.isOpen} closeModal={this.closeModal} />
      </div>
    );
  }
}

export default ExampleModalBasic;
