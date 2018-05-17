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
  display: flex;
  flex-direction: column;

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
  flex: 1;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  & > button {
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  ${props =>
    props.fullWidthBtn &&
    css`
      & > button {
        flex: 1;
      }
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

  renderBtns(btnObjs, fullWidthBtn) {
    return (
      <BtnWrapper fullWidthBtn={fullWidthBtn}>
        {btnObjs.map(({ btnProps, text, cb }, idx) => {
          const { style, size } = btnProps;
          return (
            <Button
              key={idx}
              onClick={cb && (() => cb())}
              //
              primary={style === 'primary'}
              secondary={style === 'secondary'}
              tertiary={style === 'tertiary'}
              remove={style === 'remove'}
              isDisabled={style === 'isDisabled'}
              isLoading={style === 'isLoading'}
              //
              small={size === 'small'}
              medium={size === 'medium'}
              large={size === 'large'}
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
      btnObjs,
      closeModal,
    } = this.props;
    console.log('this.props: ', this.props);

    return ReactDOM.createPortal(
      <OuterBox outsideBgColor={outsideBgColor} onClick={e => closeModal()}>
        <InnerBox
          insideBgColor={insideBgColor}
          top={top}
          left={left}
          height={height}
          width={width}
          onClick={e => e.stopPropagation()}
        >
          <CloseBtnPositioning>
            <CloseBtn onClick={() => closeModal()} size="16px" />
          </CloseBtnPositioning>
          {headerText && <HeaderText>{headerText}</HeaderText>}
          {children}
          {btnObjs.length !== 0 && this.renderBtns(btnObjs, fullWidthBtn)}
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
    if (this.props.isOpen) {
      return this.openModal(this.props.children);
    }
    return null;
  }
}

export default SandboxModal;
