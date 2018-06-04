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
import DropdownBar from './components/DropdownBar';
import DropdownMenu from './components/DropdownMenu';

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
    } = this.props.propValues || this.props;

    const currentValue = propValues ? propValues.value : value;

    this.state = {
      showMenu: false,

      selection: multiselect ? 
        Util.getSelectedItems(currentValue, options)
        : Util.getSelectedItem(currentValue, placeholder, options),
      
      firstLine: Util.getTextOfSelection(currentValue, options, placeholder, multiselect),
      inputValue: '',
    };
  
    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.selectAllOptions = this.selectAllOptions.bind(this);

    this.getPlaceHolderText = this.getPlaceHolderText.bind(this);
    this.getFirstLine = this.getFirstLine.bind(this);
    this.renderTabItems = this.renderTabItems.bind(this);
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
      onChange,
      options,
      placeholder
    } = this.props.propValues || this.props;

    let newSelection = item.key;
    if (multiselect) newSelection = DataUtil.addOrRemove(item.key, this.state.selection);

    let firstLine = Util.getTextOfSelection(newSelection, options, placeholder, multiselect);
    
    this.setState({
      selection: newSelection,
      showMenu: multiselect ? true : false,
      inputValue: multiselect ? this.state.inputValue : '',
      firstLine
    }, () => onChange(e, newSelection, propName));
  }

  selectAllOptions(e){
    const {
      onChange,
      options,
      propName,
      placeholder
    } = this.props.propValues || this.props;

    let newSelection = [];
    let firstLine = placeholder;

    if (this.state.selection.length !== options.length){
      newSelection = options.map((o) => o.key);
      firstLine = 'ALL';
    }
    
    this.setState({
      selection: newSelection,
      firstLine
    }, () => onChange(e, newSelection, propName));
  }

  // -------------------------------------------------------------------------------------
  // --------------------------------- Render Methods -----------------------------------
  // -------------------------------------------------------------------------------------

  getPlaceHolderText(searchable, placeholder) {
    return (
      <Styles.FlexStartAlign 
        empty={_.isEmpty(this.state.selection)} 
        searchable={searchable}>
        <Styles.FirstListWrapper>
          {searchable && <Styles.StyledSearchIcon />}
          <Styles.PlaceHolder searchable={searchable}>{this.state.firstLine}</Styles.PlaceHolder>
        </Styles.FirstListWrapper>
      </Styles.FlexStartAlign>
    );
  }

  getFirstLine(searchable, placeholder) {    
    if (searchable) {
      return (
        <Styles.MenuItem notSelectable>
          <Styles.FlexStartAlign>
            <Styles.FirstListWrapper>
              <Styles.StyledSearchIcon />

              <Styles.SearchInput
                value={this.state.inputValue}
                placeholder={this.state.firstLine}
                innerRef={input => input && input.focus()}
                onChange={e => this.setState({ inputValue: e.target.value })}
              />
            </Styles.FirstListWrapper>
          </Styles.FlexStartAlign>

          <Styles.DownArrow onClick={this.toggleMenu} />
        </Styles.MenuItem>
      );
    }

    return (
      <Styles.MenuItem firstMenuItem onClick={this.toggleMenu}>
        <Styles.FirstListWrapper>
          <Styles.PlaceHolder empty={_.isEmpty(this.state.selection)}>
            {this.state.firstLine}
          </Styles.PlaceHolder>
        </Styles.FirstListWrapper>

        <Styles.DownArrow />
      </Styles.MenuItem>
    );
  }

  renderTabItems(filteredOptions){
    const {
      propName,
      multiselect,
      options
    } = this.props.propValues || this.props;

    let tabs = filteredOptions.map((item, idx) => {
      return (
        <Styles.TabItem
          key={idx}
          selected={item.key === this.state.selection}
          index={idx}
          value={item.key}
          onClick={(e) => this.updateSelection(e, item, propName)}
        >
          {multiselect && <Styles.StyledCheckedSquare
            selected={this.state.selection.includes(item.key)}/>
          }
          {item.text}
        </Styles.TabItem>
      );
    });

    if (multiselect) tabs.push(
      <Styles.TabItem
        key={'all'}
        selected={
          this.state.selection.length === options.length
        }
        index={tabs.length}
        value={'all'}
        onClick={(e) => this.selectAllOptions(e)}
      >
        <Styles.StyledCheckedSquare
            selected={this.state.selection.length === options.length}/>
        ALL
      </Styles.TabItem>
    )

    return tabs;
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

          <DropdownBar
            style={dropdownBarStyle}
            onClick={this.toggleMenu}>
            {this.getPlaceHolderText(searchable, placeholder)}
          </DropdownBar>

          <DropdownMenu 
            showMenu={this.state.showMenu}>
            {this.getFirstLine(searchable, placeholder)}

            <Styles.MenuList
              scrollable={filteredOptions.length > 5}
              showMenu={this.state.showMenu}>
              { this.renderTabItems(filteredOptions) }
            </Styles.MenuList>
          </DropdownMenu>

        </Styles.DropdownContainer>

        
      </Styles.MainContainer>
    );
  }
}

Dropdown.propTypes = {
  singleOrMultiselectValue: function(props){
    const{
      value,
      multiselect
    } = props.propValues || props;
    
    if (Array.isArray(value) && !multiselect){
      return new Error(
        `Invalid prop value, value must be an Array if multiselect is set.`
      );
    }

    if (typeof value === 'string' && multiselect){
      return new Error(
        `Invalid prop value, value must be a String if multiselect is not set.`
      );
    }
  }
}

export default onClickOutside(Dropdown);
