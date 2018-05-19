import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import styled, { css } from 'styled-components';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const DropdownBar = styled.div`
  width: 18rem;
  height: 2.5rem;
  padding: 0.5rem;

  background-color: transparent;
  border-bottom: 1px solid var(--color-medium-gray);

  box-sizing: border-box;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
`;

const DropdownMenu = styled.div`
  width: inherit;

  margin-top: -2.5rem;

  position: absolute;
  display: block;
  visibility: hidden;

  background-color: var(--color-main-background);

  overflow-y: hidden;
  overflow-x: hidden;

  visibility: ${props => props.showMenu && 'visible'};
  box-shadow: ${props => props.showMenu && '0 1px 3px 0 rgba(0, 0, 0, 0.5)'};

  z-index: 2;
`;

const MenuList = styled.div`
  overflow-y: ${props => props.scrollable && 'scroll'};
  height: auto;
  max-height: ${props => (props.showMenu ? '12.5rem' : '0rem')};
  transition: max-height 0.2s ease-in;
`;

const MenuItem = styled.div`
  width: inherit;
  height: 2.5rem;
  padding: 0.5rem !important;
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  color: var(--color-dark-night);
  background-color: var(--color-white);

  ${props => props.notSelectable ? 'color: var(--color-medium-gray);' : ''}
`;

const TabItem = MenuItem.extend.attrs({
  tabIndex: '0',
})`
  &:hover, &:focus {
    outline: none;
    background-color: var(--color-evening);
    color: var(--color-silk-white);
  }

  ${props => (props.selected && css`
    outline: none;
    background-color: var(--color-evening);
    color: var(--color-silk-white);
  `)}
`;

const DownArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;

  border-top: 6px solid var(--color-medium-gray);

  border-radius: 2px;

  display: flex;
  align-self: center;
`;

const PlaceHolder = styled.span`
  color: ${props => props.empty && 'var(--color-warm-light)'};
`;

const DropdownContainer = styled.div`
  width: 18rem;
  position: relative;
`;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  border-width: 0px;
  height: 100%;
  margin-bottom: 0px;

  outline: none;
`;

const FlexStartAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 20 20"
    style={{ marginRight: '0.5rem' }}
  >
    <g fill="#C3C3C3" fillRule="nonzero">
      <path d="M7 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0-2C3.1 0 0 3.1 0 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zM20 18.3L18.3 20 12 13.7V12h1.7z" />
      <path d="M10.693 11.575l.849-.849 2.545 2.546-.848.848z" />
    </g>
  </svg>
);

class Dropdown extends Component {
  constructor(props) {
    super(props);

    let value = this.props.propValues ?
      this.props.propValues.value
      : this.props.value;

    this.state = {
      showMenu: false,
      selectedItem: this.getSelectedItem(value),
      empty: !value,
      inputValue: '',
    };

    this.getPlaceHolderText = this.getPlaceHolderText.bind(this);
    this.getFirstLine = this.getFirstLine.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getPlaceHolderText(searchable, placeholder) {
    const text = this.state.empty ? placeholder : this.state.selectedItem.text;

    if (searchable) {
      return (
        <FlexStartAlign>
          <SearchIcon />
          {text}
        </FlexStartAlign>
      );
    }
    
    return text;
  }

  getSelectedItem(value) {
    let selectedItem = { key: '', text: this.props.placeholder };

    if (value) {
      selectedItem = this.props.options.find(o => o.key === value);
    }

    return selectedItem;
  }

  getFirstLine(searchable, placeholder) {
    if (searchable) {
      return (
        <MenuItem notSelectable>
          <FlexStartAlign>
            <SearchIcon />

            <SearchInput
              value={this.state.inputValue}
              placeholder={this.state.selectedItem.text}
              innerRef={input => input && input.focus()}
              onChange={e => this.setState({ inputValue: e.target.value })}
            />
          </FlexStartAlign>

          <DownArrow onClick={this.toggleMenu} />
        </MenuItem>
      );
    }

    return (
      <MenuItem notSelectable onClick={this.toggleMenu}>
        <PlaceHolder empty={this.state.empty}>{this.getPlaceHolderText(searchable, placeholder)}</PlaceHolder>

        <DownArrow />
      </MenuItem>
    );
  }

  getOptionsList(options, searchable) {
    let filteredOptions = options;

    if (searchable) {
      filteredOptions = filteredOptions.filter(o => {
        return o.text.toLowerCase().includes(this.state.inputValue.toLowerCase());
      });
    }

    return filteredOptions;
  }

  toggleMenu() {
    let newInput = this.state.inputValue;
    if (this.state.showMenu) newInput = '';
    this.setState({ showMenu: !this.state.showMenu, inputValue: newInput });
  }

  handleClickOutside() {
    this.setState({ showMenu: false, inputValue: '' });
  }

  render() {
    const {
      className,
      key,
      styles,
      showMenu,
      dropdownBarStyle,
      empty,
      cb,
      onChange,
      field,
      propName,
      searchable,
      options,
      label,
      description,
      placeholder,
      error,
      errorMessage
    } = this.props.propValues || this.props;

    const filteredOptions = this.getOptionsList(options, searchable);

    return (
      <MainContainer className={className}>
        <Label
          key={`label-${key}`}
          label={label}
          description={description}
        />

        <DropdownContainer
          key={key}
          style={styles}
          showMenu={this.state.showMenu}
        >
          <ErrorMessage
            error={error}
            errorMessage={errorMessage}
          />

          <DropdownBar
            style={dropdownBarStyle}
            onClick={this.toggleMenu}>

            <PlaceHolder
              empty={this.state.empty}>
              {this.getPlaceHolderText(searchable, placeholder)}
            </PlaceHolder>

            <DownArrow />
          </DropdownBar>

          <DropdownMenu 
            showMenu={this.state.showMenu}>
            {this.getFirstLine(searchable, placeholder)}

            <MenuList
              scrollable={filteredOptions.length > 5}
              showMenu={this.state.showMenu}>
              {filteredOptions.map((item, idx) => (
                <TabItem
                  key={idx}
                  selected={item === this.state.selectedItem}
                  index={idx}
                  onClick={() => {
                    this.setState({
                      selectedItem: item, showMenu: false, empty: false, inputValue: ''
                    });
                    onChange(item.key, propName);
                  }}
                >
                  {item.text}
                </TabItem>
              ))}
            </MenuList>
          </DropdownMenu>

        </DropdownContainer>

        
      </MainContainer>
    );
  }
}

export default onClickOutside(Dropdown);
