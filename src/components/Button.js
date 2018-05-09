import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import colors from '../colors';
import * as SvgIcons from '../components/SvgIcons';

const absCenterPositioning = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Common Style -----------------------------------
// -----------------------------------------------------------------------------------------
const commonBtnStyle = `
  position: relative;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  font-weight: 300;
  transition: all .2s;
`;

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Size -------------------------------------------
// -----------------------------------------------------------------------------------------
const smallHeight = 32;
const mediumHeight = 40;
const largeHeight = 48;

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Size -------------------------------------------
// -----------------------------------------------------------------------------------------
const small = `
  height: ${smallHeight}px;
  font-size: 16px;
  padding: 0 32px;
`;

const medium = `
  height: ${mediumHeight}px;
  font-size: 18px;
  padding: 0 40px;
`;

const large = `
  height: ${largeHeight}px;
  font-size: 20px;
  padding: 0 40px;
`;

const fullWidth = `
  padding: 0;
  width: 100%;
`;

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Color ------------------------------------------
// -----------------------------------------------------------------------------------------
const primary = `
  background: ${colors.TEAL};
  color: #fff;
  &:hover {
    background: ${colors.DARK_TEAL};
  }
  &:active {
    background: ${colors.DEEP_TEAL};
  }
`;

const secondary = `
  border: 1px solid currentColor;
  background: transparent;
  color: ${colors.TEAL};
  &:hover {
    border: 1px solid ${colors.DARK_TEAL};
    background: ${colors.DARK_TEAL};
    color: #fff;
  }
  &:active {
    border: 1px solid ${colors.DEEP_TEAL};
    background: ${colors.DEEP_TEAL};
    color: #fff;
  }
`;

const tertiary = `
  border: 1px solid currentColor;
  background: transparent;
  color: ${colors.EVENING};
  &:hover {
    border: 1px solid ${colors.NIGHT};
    background: ${colors.NIGHT};
    color: #fff;
  }
  &:active {
    border: 1px solid ${colors.DARK_NIGHT};
    background: ${colors.DARK_NIGHT};
    color: #fff;
  }
`;

const remove = `
  background: ${colors.ENERGY};
  color: #fff;
  &:hover {
    background: ${colors.DARK_ENERGY};
  }
  &:active {
    background: ${colors.DEEP_ENERGY};
  }
`;

const isDisabled = `
  border: none !important;
  background: ${colors.COOL_LIGHT} !important;
  color: ${colors.MEDIUM_GRAY} !important;
  cursor: not-allowed !important;
`;

// -----------------------------------------------------------------------------------------
// ---------------------------------------- Styled Components ------------------------------
// -----------------------------------------------------------------------------------------
const BtnStyle = styled.button`
  ${commonBtnStyle};

  /* Default Style */
  ${medium};
  ${primary};

  /* Size */
  ${props => props.small && css`${small};`};
  ${props => props.medium && css`${medium};`};
  ${props => props.large && css`${large};`};
  ${props => props.fullWidth && css`${fullWidth};`};

  /* Color */
  ${props => props.primary && css`${primary};`};
  ${props => props.secondary && css`${secondary};`};
  ${props => props.tertiary && css`${tertiary};`};
  ${props => props.remove && css`${remove};`};
  ${props => props.isDisabled && css`${isDisabled};`};
  ${props => props.isLoading && css`${isDisabled};`};
`;

const Text = styled.div`${props => props.isLoading && css`visibility: hidden;`};`;

const IsLoadingBox = styled.div`
  ${absCenterPositioning};

  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.isLoading && css`visibility: visible;`};
`;

const Button = props => {
  // ---------------------------------------------------------------------------------------
  // ---------------------------------- Render ---------------------------------------------
  // ---------------------------------------------------------------------------------------
  const { isLoading, small, medium, large } = props;

  const multiplyBy = 0.7;

  let size = mediumHeight * multiplyBy;
  if (small) size = smallHeight * multiplyBy;
  else if (large) size = largeHeight * multiplyBy;

  return (
    <BtnStyle {...props}>
      <Text isLoading={isLoading}>{props.children}</Text>
      <IsLoadingBox isLoading={isLoading}>
        <SvgIcons.synapse_circle_logo color={colors.TEAL} size={size} rotate_ccw_normal />
      </IsLoadingBox>
    </BtnStyle>
  );
};

export default Button;
