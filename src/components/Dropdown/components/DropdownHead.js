import React from 'react';
import styled from 'styled-components';

import * as Styles from '../styles/Dropdown.styles';

const DropdownHead = (props) => {
  const {
    showMenu,
    style,
    onClick,
    children
  } = props;

  return (
    <Styles.DropdownHead
      style={style}
      onClick={onClick}
    >
      {children}
      <Styles.DownArrow />
    </Styles.DropdownHead>
  );
}

export default DropdownHead;
