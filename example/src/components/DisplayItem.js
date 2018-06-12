import React from 'react';
import styled from 'styled-components';

const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  p {
    text-align: left;
    min-width: 100px;
  }
`;

const DisplayItem = (props) => {
  const { item } = props;

  console.log('props: ', props);

  return(
    <DropdownItem>
      <p>{item.text}</p>
      <p>{item.key}</p>
      <p>Some Role i guess</p>
    </DropdownItem>
  )
}

export default DisplayItem;