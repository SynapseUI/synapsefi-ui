import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

// -------------------------------------------------------------------------------------
// --------------------------------- Imported Methods ----------------------------------
// -------------------------------------------------------------------------------------

import * as Util from './util/Dropdown.util';
import * as DataUtil from '../util/dataGatheringMethods'
import * as Colors from '../../colors';

// -------------------------------------------------------------------------------------
// --------------------------------- Imported Components -------------------------------
// -------------------------------------------------------------------------------------

import Label from '../Label/Label';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

// -------------------------------------------------------------------------------------
// --------------------------------- Imported Styles -----------------------------------
// -------------------------------------------------------------------------------------

import { baseInputStyling } from '../styles/Input.styles';
import * as Styles from './styles/Dropdown.styles'

// -------------------------------------------------------------------------------------
// --------------------------------- Dropdown Class -----------------------------------
// -------------------------------------------------------------------------------------

class Dropdown extends Component {
  constructor(props) {
    super(props);

    const {
      propValues,
      value,
      multiselect,
      searchable,
      placeholder,
      options
    } = this.props;

    const currentValue = propValues ? propValues.value : value;

    this.state = {
      showMenu: false,
      selectedItem: Util.getSelectedItem(currentValue, placeholder, options),
      empty: !currentValue,
      inputValue: '',
      selectedItems: multiselect ? Util.getSelectedItems(currentValue, options) : []
    };
  
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateSelection = this.updateSelection.bind(this);

    this.getPlaceHolderText = this.getPlaceHolderText.bind(this);
    this.getFirstLine = this.getFirstLine.bind(this);
  }

  // -------------------------------------------------------------------------------------
  // --------------------------------- Handler Methods -----------------------------------
  // -------------------------------------------------------------------------------------

  toggleMenu() {
    let newInput = this.state.inputValue;
    if (this.state.showMenu) newInput = '';
    this.setState({ showMenu: !this.state.showMenu, inputValue: newInput });
  }

  handleClickOutside() {
    this.setState({ showMenu: false, inputValue: '' });
  }

  updateSelection(e, item, propName){
    const {
      multiselect,
      onChange
    } = this.props;

    // debugger;

    if(multiselect){
      const newList = DataUtil.addOrRemove(item.key, this.state.selectedItems);
      
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
  }

  // -------------------------------------------------------------------------------------
  // --------------------------------- Render Methods -----------------------------------
  // -------------------------------------------------------------------------------------

  getPlaceHolderText(searchable, placeholder) {
    let text = placeholder;

    if(this.props.multiselect){
      text = Util.toStringList(this.state.selectedItems, placeholder);
    }

    if(!this.state.empty && !this.props.multiselect){
      text = this.state.selectedItem ? this.state.selectedItem.text : placeholder;
    }

    if (searchable) {
      return (
        <Styles.FlexStartAlign empty={this.state.empty}>
          <Styles.StyledSearchIcon style={{ marginRight: '8px' }}/>
          {text}
        </Styles.FlexStartAlign>
      );
    }
    
    return <Styles.FlexStartAlign empty={this.state.empty}>{text}</Styles.FlexStartAlign>;
  }

  getFirstLine(searchable, placeholder) {
    let text = this.props.multiselect ? 
      Util.toStringList(this.state.selectedItems, placeholder)
      : this.getPlaceHolderText(searchable, placeholder);
    
    if(this.state.selectedItem) text = this.state.selectedItem.text    

    if (searchable) {
      return (
        <Styles.MenuItem notSelectable>
          <Styles.FlexStartAlign>
            <Styles.StyledSearchIcon />

            <Styles.SearchInput
              value={this.state.inputValue}
              placeholder={text}
              innerRef={input => input && input.focus()}
              onChange={e => this.setState({ inputValue: e.target.value })}
            />
          </Styles.FlexStartAlign>

          <Styles.DownArrow onClick={this.toggleMenu} />
        </Styles.MenuItem>
      );
    }

    return (
      <Styles.MenuItem firstMenuItem onClick={this.toggleMenu}>
        <Styles.PlaceHolder empty={this.state.empty}>{text}</Styles.PlaceHolder>

        <Styles.DownArrow />
      </Styles.MenuItem>
    );
  }

  // -------------------------------------------------------------------------------------
  // --------------------------------- Render -----------------------------------
  // -------------------------------------------------------------------------------------

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
      error,
      multiselect
    } = this.props.propValues || this.props;

    const filteredOptions = Util.getOptionsList(options, searchable, this.state.inputValue);

    let firstLineText = multiselect ? 
      Util.toStringList(this.state.selectedItems, placeholder)
      : this.getPlaceHolderText(searchable, placeholder);

    return (
      <Styles.MainContainer className={className}>
        <Label
          key={`label-${key}`}
          label={label}
          labelWidth={labelWidth}
          description={description}
        />

        <Styles.DropdownContainer
          key={key}
          style={styles}
          showMenu={this.state.showMenu}
        >
          <ErrorMessage error={error}/>

          <Styles.DropdownBar
            style={dropdownBarStyle}
            onClick={this.toggleMenu}>
            {this.getPlaceHolderText(searchable, placeholder)}
            <Styles.DownArrow />
          </Styles.DropdownBar>

          <Styles.DropdownMenu 
            showMenu={this.state.showMenu}>
            {this.getFirstLine(searchable, placeholder)}

            <Styles.MenuList
              scrollable={filteredOptions.length > 5}
              showMenu={this.state.showMenu}>
              {filteredOptions.map((item, idx) => (
                <Styles.TabItem
                  key={idx}
                  selected={item === this.state.selectedItem}
                  index={idx}
                  value={item.key}
                  onClick={(e) => this.updateSelection(e, item, propName)}
                >
                  {this.props.multiselect &&
                    <Styles.StyledCheckedSquare
                      selected={this.state.selectedItems.includes(item.key)}/>
                  }
                  {item.text}
                </Styles.TabItem>
              ))}
            </Styles.MenuList>
          </Styles.DropdownMenu>

        </Styles.DropdownContainer>

        
      </Styles.MainContainer>
    );
  }
}

Dropdown.propTypes = {
  singleOrMultiselectValue: function(props){
    let value = props.value || props.propValues.value;
    
    if (Array.isArray(value) && !props.multiselect){
      return new Error(
        `Invalid prop value, value must be an Array if multiselect is set.`
      );
    }

    if (typeof value === 'string' && props.multiselect){
      return new Error(
        `Invalid prop value, value must be a String if multiselect is not set.`
      );
    }
  }
}

export default onClickOutside(Dropdown);
