import React, { Component } from 'react';
import _ from 'lodash';
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
import DropdownHead from './components/DropdownHead';
import DropdownContent from './components/DropdownContent';

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

    this.state = {
      ...Util.getStateFromProps(this.props)
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.selectAllOptions = this.selectAllOptions.bind(this);

    this.getPlaceHolderText = this.getPlaceHolderText.bind(this);
    this.getFirstLine = this.getFirstLine.bind(this);
    this.renderTabItems = this.renderTabItems.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.value !== nextProps.value ||
      (this.props.propValues && 
        this.props.propValues.value !== nextProps.propValues.value)
    ){
      const omitedValues = (nextProps.propValues 
          && nextProps.propValues.multiselect)
          || nextProps.multiselect ?
          ['showMenu', 'inputValue'] : [];

      this.setState({
        ..._.omit(Util.getStateFromProps(nextProps), omitedValues),
      });
    }
  }

  // -------------------------------------------------------------------------------------
  // --------------------------------- Handler Methods -----------------------------------
  // -------------------------------------------------------------------------------------

  checkIfSelectionEmpty(){
    const { multiselect } = this.props.propValues || this.props;

    return multiselect ?
      _.isEmpty(this.state.selection)
      : _.isEmpty(this.state.selection.key);
  }

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

    let singleSelection;
    let newSelection = item;
    let firstLine = item.text;

    if (multiselect){
      newSelection = DataUtil.addOrRemove(item.key, this.state.selection);
    } else {
      newSelection = this.state.selection.key !== item.key ? item : '';
    }

    if(!multiselect) onChange(e, newSelection.key || '', propName)
    else onChange(e, newSelection, propName)
  }

  selectAllOptions(e){
    const {
      onChange,
      options,
      propName,
      placeholder
    } = this.props.propValues || this.props;

    let newSelection = [];

    if (this.state.selection.length !== options.length){
      newSelection = options.map((o) => o.key);
    }
    
    onChange(e, newSelection, propName);
  }

  // -------------------------------------------------------------------------------------
  // --------------------------------- Render Methods -----------------------------------
  // -------------------------------------------------------------------------------------

  getPlaceHolderText(searchable, placeholder) {
    const isSelectionEmpty = this.checkIfSelectionEmpty()

    return (
      <Styles.FlexStartAlign 
        searchable={searchable}>

        <Styles.FirstListWrapper>
          {searchable && <Styles.StyledSearchIcon />}

          <Styles.PlaceHolder
            empty={isSelectionEmpty}
            searchable={searchable}>
            {this.state.firstLine}
          </Styles.PlaceHolder>

        </Styles.FirstListWrapper>
      </Styles.FlexStartAlign>
    );
  }

  getFirstLine(searchable, placeholder) {    
    if (searchable) {
      return (
        <Styles.MenuItem notSelectable>
          <Styles.FlexStartAlign empty={this.checkIfSelectionEmpty()} >
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
          <Styles.PlaceHolder empty={_.isEmpty(this.state.selection.key)}>
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
      renderOptionItem,
      options
    } = this.props.propValues || this.props;
    
    let tabs = filteredOptions.map((item, idx) => {
      const display = !!renderOptionItem ? renderOptionItem(item) : item.text;
      
      return (
        <Styles.TabItem
          key={idx}
          selected={item.key === this.state.selection.key}
          index={idx}
          value={item.key}
          onClick={(e) => this.updateSelection(e, item, propName)}
        >
          {multiselect && <Styles.StyledCheckedSquare
            selected={this.state.selection.includes(item.key)}/>
          }
          {display}
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
        All
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
      dropdownHeadStyle,
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
      errorStyle,
      multiselect
    } = this.props.propValues || this.props;

    const filteredOptions = this.state.showMenu ?
      Util.getOptionsList(options, searchable, this.state.inputValue)
      : [];    

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
          <ErrorMessage error={error} errorStyle={errorStyle}/>

          <DropdownHead
            style={dropdownHeadStyle}
            onClick={this.toggleMenu}>
            {this.getPlaceHolderText(searchable, placeholder)}
          </DropdownHead>

          <DropdownContent
            showContent={this.state.showMenu}>
            {this.getFirstLine(searchable, placeholder)}

            <Styles.MenuList
              scrollable={filteredOptions.length > 5}
              showMenu={this.state.showMenu}>
              { this.renderTabItems(filteredOptions) }
            </Styles.MenuList>
          </DropdownContent>

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
