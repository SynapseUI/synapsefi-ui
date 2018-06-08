import React from 'react';
import styled from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import * as Styles from '../styles/Dropdown.styles';

const DropdownContent = (props) => {
  const {
    children,
    showContent,
    style,
    verticalOffset
  } = props;

  return (
    <Styles.DropdownContent
      style={style}
      showContent={showContent}
      verticalOffset={verticalOffset}>
      {children}
    </Styles.DropdownContent>
  );
}

export default DropdownContent;