import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import styled, { css } from 'styled-components';
import { search, check_filled_square } from '../SvgIcons';
import Colors from '../../colors';

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { baseInputStyling } from '../styles/Input.styles';

const StyledCheckedSquare = styled(check_filled_square)`
  height: 20px;
  width: 20px;

  margin-right: 16px;
  border: 2px solid #8c8c8c;
  border: ${props => (props.selected && css`none`)};
  box-sizing: border-box;

  path:first-of-type {
    fill: white;
    ${props => (props.selected && css`
      fill: ${Colors.TEAL};
      border: none;
    `)}
  }
  
`;

const DropdownBar = styled.div`
  width: 288px;
  height: 40px;
  padding: 8px;

  background-color: transparent;
  border-bottom: 1px solid ${Colors.MEDIUM_GRAY};

  box-sizing: border-box;

  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.div`
  width: inherit;

  margin-top: -40px;

  position: absolute;
  display: block;
  visibility: hidden;

  background-color: ${Colors.WHITE};

  overflow-y: hidden;
  overflow-x: hidden;

  visibility: ${props => props.showMenu && 'visible'};
  box-shadow: ${props => props.showMenu && '0 1px 3px 0 rgba(0, 0, 0, 0.5)'};

  z-index: 2;
`;

const MenuList = styled.div`
  overflow-y: ${props => props.scrollable && 'scroll'};
  height: auto;
  max-height: ${props => (props.showMenu ? '200px' : '0px')};
  transition: max-height 0.2s ease-in;
`;

const MenuItem = styled.div`
  box-sizing: border-box;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;

  display: flex;
  // justify-content: space-between;
  align-items: center

  color: ${Colors.DARK_NIGHT};
  background-color: ${Colors.WHITE};

  ${props => props.firstMenuItem ? `
    color: ${Colors.MEDIUM_GRAY};
    border-bottom: 1px solid transparent;
  ` : ''}
`;

const TabItem = MenuItem.extend.attrs({
  tabIndex: '0',
})`
  &:hover, &:focus {
    outline: none;
    background-color: ${Colors.EVENING};
    color: ${Colors.SILK_WHITE};
  }

  ${props => (props.selected && css`
    outline: none;
    background-color: ${Colors.EVENING};
    color: ${Colors.SILK_WHITE};
  `)}
`;

const DownArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;

  border-top: 6px solid ${Colors.MEDIUM_GRAY};

  border-radius: 2px;

  display: flex;
  align-self: center;
`;

const PlaceHolder = styled.span`
  color: ${props => props.empty && Colors.WARM_LIGHT};
  font-size: 16px;
  width: 100%;
`;

const DropdownContainer = styled.div`
  width: 288px;
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

  width: 85%;
`;

const FlexStartAlign = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  font-size: 16px;

  color: ${props => props.empty && Colors.WARM_LIGHT};
`;

const StyledSearchIcon = styled(search)`
  width: 16px;
  height: 16px;
  fill: ${Colors.WARM_LIGHT};
`;

const toStringList = (selectedItems, placeHolder) => {
  return _.isEmpty(selectedItems) ? placeHolder : _.join(selectedItems, ', ')
}

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
      selectedItems: this.props.multiselect ? this.getSelectedItems(value) : []
    };    

    this.getPlaceHolderText = this.getPlaceHolderText.bind(this);
    this.getFirstLine = this.getFirstLine.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.addOrRemove = this.addOrRemove.bind(this);
  }

  getPlaceHolderText(searchable, placeholder) {
    let text = placeholder;

    if(this.props.multiselect){
      text = toStringList(this.state.selectedItems, placeholder);
    }
    console.log("get placeholder text:", text);

    if(!this.state.empty && !this.props.multiselect){
      text = this.state.selectedItem ? this.state.selectedItem.text : placeholder;
    }


    
    // const text = this.state.empty ? placeholder : this.state.selectedItem.text;

    if (searchable) {
      return (
        <FlexStartAlign empty={this.state.empty}>
          <StyledSearchIcon style={{ marginRight: '8px' }}/>
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

  getSelectedItems(value){
    return this.props.options.reduce((memo, o) => {
      if(value.includes(o.key)){
        memo.push(o.key);
      }
      return memo;
    }, []);
  }

  getFirstLine(searchable, placeholder) {
    let text = this.props.multiselect ? 
      toStringList(this.state.selectedItems, placeholder)
      : this.getPlaceHolderText(searchable, placeholder);
    
    if(this.state.selectedItem) text = this.state.selectedItem.text

    console.log('text:', text);
    

    if (searchable) {
      return (
        <MenuItem notSelectable>
          <FlexStartAlign>
            <StyledSearchIcon />

            <SearchInput
              value={this.state.inputValue}
              placeholder={text}
              innerRef={input => input && input.focus()}
              onChange={e => this.setState({ inputValue: e.target.value })}
            />
          </FlexStartAlign>

          <DownArrow onClick={this.toggleMenu} />
        </MenuItem>
      );
    }

    return (
      <MenuItem firstMenuItem onClick={this.toggleMenu}>
        <PlaceHolder empty={this.state.empty}>{text}</PlaceHolder>

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

  addOrRemove(key) {
    let newList = [...this.state.selectedItems];
    if (newList.includes(key)) {
      let idx = newList.indexOf(key);
      newList = newList.slice(0, idx).concat(newList.slice(idx + 1));
    } else {
      newList.push(key);
    }

    return newList;
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
      labelWidth,
      description,
      placeholder,
      error
    } = this.props.propValues || this.props;

    const filteredOptions = this.getOptionsList(options, searchable);

    console.log('this.state: ', this.state);

    let firstLineText = this.props.multiselect ? 
      toStringList(this.state.selectedItems, placeholder)
      : this.getPlaceHolderText(searchable, placeholder);
    

    return (
      <MainContainer className={className}>
        <Label
          key={`label-${key}`}
          label={label}
          labelWidth={labelWidth}
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
            
            {this.getPlaceHolderText(searchable, placeholder)}
            {/*<PlaceHolder
              empty={this.state.empty}>
              {firstLineText}
            </PlaceHolder>*/}

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

                    if(this.props.multiselect){
                      const newList = this.addOrRemove(item.key);
                      this.setState({
                        selectedItems: newList,
                        empty: _.isEmpty(newList)
                      })
                    } else {
                      this.setState({
                        selectedItem: item, showMenu: false, empty: false, inputValue: ''
                      });
                    }

                    onChange(e, item.key, propName);
                  }}
                >
                  {this.props.multiselect &&
                    <StyledCheckedSquare selected={this.state.selectedItems.includes(item.key)}/>
                  }
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
