import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import styled, { css } from 'styled-components';
import { search } from '../SvgIcons';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { baseInputStyling } from '../styles/Input.styles';

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
  ${baseInputStyling}

  border-width: 0px;
  height: 100%;
  margin-bottom: 0px;
  font-size: 16px;

  outline: none;

  width: 90%;
`;

const FlexStartAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const StyledSearchIcon = styled(search)`
  width: 15px;
  height: 15px;
  fill: var(--color-warm-light);
`;

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
          <StyledSearchIcon style={{ marginRight: '0.5rem' }}/>
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
            <StyledSearchIcon />

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
      onChange,
      propName,
      searchable,
      options,
      label,
      description,
      placeholder,
      error
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
          <ErrorMessage error={error}/>

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
                  value={item.key}
                  onClick={(e) => {
                    this.setState({
                      selectedItem: item, showMenu: false, empty: false, inputValue: ''
                    });
                    onChange(e, propName);
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
