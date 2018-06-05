import React from 'react';
import styled from 'styled-components';

import * as Styles from '../styles/Dropdown.styles';

const DropdownBar = (props) => {
  const {
    showMenu,
    style,
    onClick,
    children
  } = props;

  return (
    <Styles.DropdownBar
      style={style}
      onClick={onClick}
    >
      {children}
      <Styles.DownArrow />
    </Styles.DropdownBar>
  );
}

export default DropdownBar;
