import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import colors from '../colors';
import CloseBtn from './CloseBtn';
import Button from './Button';

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
`;

const CloseBtnPositioning = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
`;

const HeaderText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.DARK_NIGHT};
  border-bottom: solid 1px ${colors.WARM_LIGHT};
  line-height: 1;
  padding-bottom: 24px;
  margin-bottom: 32px;
`;

const BtnWrapper = styled.div`
  display: grid;
  grid-gap: 16px;
  justify-content: end;

  ${props =>
    props.oneBtn && css`grid-template-columns: ${props => (props.fullWidthBtn ? '1fr' : 'auto')};`};

  ${props =>
    props.twoBtns &&
    css`
      grid-template-columns: ${props => (props.fullWidthBtn ? '1fr 1fr' : 'auto auto')};
    `};
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

    const divUnderProvider = document.getElementById('add-me-under-Provider');

    divUnderProvider === null
      ? document.body.appendChild(this.modal)
      : divUnderProvider.appendChild(this.modal);
  }

  renderBtns({ leftBtnObj, rightBtnObj }, fullWidthBtn) {
    let buttonObjs = [];

    if (leftBtnObj) buttonObjs.push(leftBtnObj);
    if (rightBtnObj) buttonObjs.push(rightBtnObj);

    return (
      <BtnWrapper
        oneBtn={buttonObjs.length === 1}
        twoBtns={buttonObjs.length === 2}
        fullWidthBtn={fullWidthBtn}
      >
        {buttonObjs.map(({ key, text, cb }, idx) => {
          return (
            <Button
              key={idx}
              onClick={cb && (() => cb())}
              primary={key === 'primary'}
              secondary={key === 'secondary'}
              tertiary={key === 'tertiary'}
              remove={key === 'remove'}
              isDisabled={key === 'isDisabled'}
              isLoading={key === 'isLoading'}
            >
              {text}
            </Button>
          );
        })}
      </BtnWrapper>
    );
  }

  openModal(children) {
    const {
      outsideBgColor,
      insideBgColor,
      top,
      left,
      height,
      width,
      fullWidthBtn,
      headerText,
      leftBtnObj,
      rightBtnObj,
      closeModal,
    } = this.props;

    ReactDOM.render(
      <OuterBox outsideBgColor={outsideBgColor}>
        <InnerBox insideBgColor={insideBgColor} top={top} left={left} height={height} width={width}>
          <CloseBtnPositioning>
            <CloseBtn onClick={() => closeModal()} size="16px" />
          </CloseBtnPositioning>
          {headerText && <HeaderText>{headerText}</HeaderText>}
          {children}
          {(leftBtnObj || rightBtnObj) &&
            this.renderBtns({ leftBtnObj, rightBtnObj }, fullWidthBtn)}
        </InnerBox>
      </OuterBox>,
      this.modal
    );
  }

  closeModal() {
    ReactDOM.unmountComponentAtNode(this.modal);

    const divUnderProvider = document.getElementById('add-me-under-Provider');

    divUnderProvider === null
      ? document.body.removeChild(this.modal)
      : divUnderProvider.removeChild(this.modal);
  }

  render() {
    return null;
  }
}

export default SandboxModal;
