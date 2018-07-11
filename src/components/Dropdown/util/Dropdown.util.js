import _ from 'lodash';

export const getSelectedItem = (value, placeholder, options) => {
  let baseSelectedItem = { key: '', text: placeholder };
  let selectedItem;

  if (value) {
    selectedItem = options.find(o => o.key === value);
  }

  return selectedItem ? selectedItem : baseSelectedItem;
}

export const getSelectedItems = (value, options) => {
  return options.reduce((memo, o) => {
    if(value.includes(o.key)){
      memo.push(o.key);
    }
    return memo;
  }, []);
}

export const getOptionsList = (options, searchable, inputValue) => {
  let filteredOptions = options;

  if (searchable) {
    filteredOptions = filteredOptions.filter(o => {
      return o.text.toLowerCase().includes(inputValue.toLowerCase());
    });
  }

  return filteredOptions;
}

export const toStringList = (selectedItems, placeHolder) => {
  return _.isEmpty(selectedItems) ? placeHolder : _.join(selectedItems, ', ')
}

export const getTextOfSelection = (value, options, placeholder, isMultiselect = false) => {
  let text = placeholder;

  if(!value || _.isEmpty(value)) return placeholder;

  if (!isMultiselect){
    let selectedItem = options.find(o => o.key === value)
    return selectedItem ? selectedItem.text : placeholder;
  } else {
    if (value.length === options.length) return 'All'

    let collection = options.reduce((memo, o) => {
      if(value.includes(o.key)) memo.push(o.text);
      return memo;
    }, []);

    return toStringList(collection);
  }

  return placeholder || '';
}

export const getStateFromProps = props => {
  const {
    multiselect,
    value,
    options,
    placeholder,
  } = props.propValues || props;

  return {
    showMenu: false,

    selection: multiselect ?
      getSelectedItems(value, options)
      : getSelectedItem(value, placeholder, options),
    
    firstLine: getTextOfSelection(value, options, placeholder, multiselect),
    inputValue: '',
  }
}