import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';

const BtnWrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: flex-end;

  & > button {
    &:not(:last-child) {
      margin-right: 16px;
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

const BtnGroup = props => {
  return (
    <BtnWrapper fullWidthBtn={props.fullWidthBtn} bottom={props.bottom}>
      {props.btnObjs.map(({ style, size, text, onClick }, idx) => {
        return (
          <Button
            key={idx}
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
          >
            {text}
          </Button>
        );
      })}
    </BtnWrapper>
  );
};

export default BtnGroup;
