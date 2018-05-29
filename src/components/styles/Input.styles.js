import Colors from '../../colors';

export const baseInputStyling = `
  outline: none;
  display: block;
  box-shadow: none;
  resize: none;

  font-family: inherit;
  font-size: 16px;

  margin: 0;
  padding: 8px;

  width: 100%;

  border-radius: 0px;
  color: ${Colors.DARK_NIGHT};
  background-color: ${Colors.WHITE};

  &::placeholder, &::-webkit-datetime-edit {
    color: ${Colors.WARM_LIGHT};
    font-size: 16px;
  }

  &:focus {
    color: ${Colors.DARK_NIGHT};
    background-color: ${Colors.WHITE};

    outline: none;
  }
`;