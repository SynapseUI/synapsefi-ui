import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import AnchorButton from './AnchorButton';

const BtnWrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;

  & > button {
    &:not(:last-child) {
      margin-right: ${props => (props.gap ? props.gap : '16px')};
    }
  }

  ${props => props.bottom && css`align-items: flex-end;`};

  ${props =>
    props.fullWidthBtn &&
    css`
      & > button {
        flex: 1;
      }
    `};
`;

const renderAnchorBtn = ({ style, fontSize, text, onClick, idx, inlineBtnStyle }) => (
  <AnchorButton
    key={idx}
    text={text}
    onClick={onClick && (() => onClick())}
    //
    primary={style === 'primary'}
    secondary={style === 'secondary'}
    tertiary={style === 'tertiary'}
    remove={style === 'remove'}
    //
    fontSize={fontSize}
    //
    style={inlineBtnStyle ? inlineBtnStyle : {}}
  />
);

const renderRegularBtn = ({ style, size, text, onClick, inlineBtnStyle }) => (
  <Button
    key={text}
    onClick={onClick && (() => onClick())}
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
    //
    style={inlineBtnStyle ? inlineBtnStyle : {}}
  >
    {text}
  </Button>
);

const ButtonGroup = props => {
  const { fullWidthBtn, className, bottom, btnObjs, isAnchorButton, gap, inlineBtnStyle } = props;

  return (
    <BtnWrapper fullWidthBtn={fullWidthBtn} bottom={bottom} gap={gap} className={className}>
      {btnObjs.map(({ style, size, fontSize, text, onClick }, idx) => {
        if (isAnchorButton) return renderAnchorBtn({ style, fontSize, text, onClick, idx, inlineBtnStyle });
        return renderRegularBtn({ style, size, text, onClick, inlineBtnStyle });
      })}
    </BtnWrapper>
  );
};

export default ButtonGroup;
