import React from 'react';
import styled from 'styled-components';

import { Button, ErrorMessage } from '../../../src/index';

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;

  box-shadow: 0 2px 4px 2px rgba(0,0,0,0.5);
  background-color: white;
  padding: 16px;
`;

const CustomFooter = (props) => {
  const {
    handleSubmit,
    error,
    errormessage,
    isLoading
  } = props;

  return (
    <Footer>
      <ErrorMessage error={error}/>
      <Button onClick={props.handleSubmit} isLoading={isLoading}>Custom Button</Button>
    </Footer>
  )
}

export default CustomFooter;