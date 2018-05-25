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
  color: var(--color-dark-base);
  background-color: var(--color-input-background);

  &::placeholder, &::-webkit-datetime-edit {
    color: var(--color-warm-light);
  }

  &:focus {
    color: var(--color-dark-base);
    background-color: var(--color-input-background);

    outline: none;
  }
`;