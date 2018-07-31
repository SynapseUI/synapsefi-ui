import styled from 'styled-components';

const defaultFormCSS = `
  box-sizing: border-box;
  font-family: Roboto;

  & > * {
    padding: 24px 0px;

    &:last-child {
      padding-bottom: 0px;
    }
  }
`;

const DefaultStyledForm = styled.form`
  ${defaultFormCSS}
`;

export default DefaultStyledForm;