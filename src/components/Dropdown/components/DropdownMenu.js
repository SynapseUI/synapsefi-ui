import React from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import * as Styles from '../styles/Dropdown.styles';

const DropdownMenu = (props) => {
  const {
    children,
    showMenu,
    style,
    verticalOffset
  } = props;

  return (
    <Styles.DropdownMenu
      style={style}
      showMenu={showMenu}
      verticalOffset={verticalOffset}>
      {children}
    </Styles.DropdownMenu>
  );
}

export default DropdownMenu;