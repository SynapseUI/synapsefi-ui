import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import colors from '../colors';
import CloseBtn from './CloseBtn';

const OuterBox = styled.div`
  background-color: ${props =>
    props.outsideBgColor ? `${props.outsideBgColor}` : 'rgba(255,255,255,.7)'};
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
`;

const InnerBox = styled.div`
  padding: 32px;
  background-color: ${props => (props.insideBgColor ? `${props.insideBgColor}` : '#fff')};

  position: absolute;
  top: ${props => (props.top ? `${props.top}` : '50%')};
  left: ${props => (props.left ? `${props.left}` : '50%')};
  transform: translate(-50%, -50%);

  width: ${props => (props.width ? `${props.width}` : 'auto')};
  height: ${props => (props.height ? `${props.height}` : 'auto')};

  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 1px ${colors.WARM_LIGHT};
  border-radius: 4px;

  & > div:nth-child(2) > *:first-child {
    font-size: 28px;
    font-weight: bold;
    color: ${colors.DARK_NIGHT};
    border-bottom: solid 1px ${colors.WARM_LIGHT};
    line-height: 1;
    padding-bottom: 24px;
    margin-bottom: 32px;
  }
`;

const CloseBtnPositioning = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
`;

const uniqId = 'uniq-modal-id';

class SandboxModal extends Component {
  constructor(props) {
    super(props);
    this.appendElement = this.appendElement.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    // first time modal is opened
    this.appendElement();
    if (this.props.isOpen) {
      this.openModal(this.props.children);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      if (!document.getElementById(uniqId)) {
        this.appendElement();
      }

      this.openModal(nextProps.children);
    } else {
      this.closeModal();
    }
  }

  componentWillUnmount() {
    this.closeModal();
  }

  appendElement() {
    this.modal = document.createElement('div');
    this.modal.id = uniqId;
    document.body.appendChild(this.modal);
  }

  openModal(children) {
    ReactDOM.render(
      <OuterBox onClick={() => this.props.closeModal()} outsideBgColor={this.props.outsideBgColor}>
        <InnerBox
          insideBgColor={this.props.insideBgColor}
          top={this.props.top}
          left={this.props.left}
          width={this.props.width}
          height={this.props.height}
        >
          <CloseBtnPositioning>
            <CloseBtn onClick={() => this.props.closeModal()} size="16px" />
          </CloseBtnPositioning>
          {children}
        </InnerBox>
      </OuterBox>,
      this.modal
    );
  }

  closeModal() {
    ReactDOM.unmountComponentAtNode(this.modal);
    document.body.removeChild(this.modal);
  }

  render() {
    return null;
  }
}

export default SandboxModal;
