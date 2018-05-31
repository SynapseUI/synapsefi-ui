import _ from 'lodash';

export const getSelectedItem = (value, placeholder, options) => {
  let selectedItem = { key: '', text: placeholder };

  if (value) {
    selectedItem = options.find(o => o.key === value);
  }

  return selectedItem;
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