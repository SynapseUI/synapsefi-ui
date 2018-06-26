import React, { Component } from 'react';
import { range } from 'lodash';
import { Modal, Button } from 'package';
import { rejects } from 'assert';

const font = { fontSize: '20px' };
const bold = { ...font, fontWeight: 'bold' };
const content = { ...bold, marginLeft: '20px' };
const emptySpace = { height: '32px' };



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

  renderModal() {
    const btnObjs = [
      {
        text: 'Remove',
        size: 'large',
        style: 'remove',
        onClick: () => {
          const promise = new Promise((resolve, rejects) => {
            setTimeout(() => {
              resolve('yeah aaa ');
            }, 3000);
          });

          promise.then(data => {
            console.log('data: ', data);
            this.closeModal();
          });
        },
      },
      {
        text: 'Secondary',
        style: 'secondary',
        onClick: () => window.alert('secondary btn clicked'),
      },
      {
        text: 'primary btn',
      },
    ];
    return (
      <Modal
        isOpen={this.state.isOpen}
        closeModal={this.closeModal}
        headerText={'I am a Header'}
        btnObjs={btnObjs}
      >
        {[...Array(10).keys()].map((item, idx) => {
          return (
            <div key={idx} style={font}>
              Sandwich your modal contents in between Opening and closing Modal tag Like this:
            </div>
          );
        })}
        <div style={emptySpace} />
        <div style={bold}>{'<Modal>'}</div>
        <div style={content}>{'{contents}'}</div>
        <div style={bold}>{'</Modal>'}</div>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Open Basic Modal</Button>
        {this.renderModal()}
      </div>
    );
  }
}

export default ExampleModalBasic;
