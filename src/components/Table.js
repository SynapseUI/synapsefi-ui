import React from 'react';
import styled from 'styled-components';
import colors from '../colors';

const TableStyle = styled.table`
  border-collapse: collapse;
  color: ${colors.BODY};
  font-size: 14px;

  tr {
    border-top: 1px solid ${colors.WARM_LIGHT};
    &:last-child {
      border-bottom: 1px solid ${colors.WARM_LIGHT};
    }
  }

  th,
  td {
    text-align: start;
    padding: 16px 32px;
  }
`;

const Table = props => {
  return <TableStyle>{props.children}</TableStyle>;
};

export default Table;
