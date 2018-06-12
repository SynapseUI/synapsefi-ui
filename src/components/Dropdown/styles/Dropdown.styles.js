import styled, { css } from 'styled-components';
import Colors from '../../../colors';
import { search, check_filled_square } from '../../SvgIcons';
import { baseInputStyling } from '../../styles/Input.styles';

export const StyledCheckedSquare = styled(check_filled_square)`
  height: 20px;
  width: 20px;

  margin-right: 16px;
  border: 2px solid #8c8c8c;
  border: ${props => (props.selected && css`none`)};
  box-sizing: border-box;
  border-radius: 2px;

  path:first-of-type {
    fill: white;
    ${props => (props.selected && css`
      fill: ${Colors.TEAL};
      border: none;
    `)}
  }
`;

export const MenuList = styled.div`
  overflow-y: ${props => props.scrollable && 'scroll'};
  height: auto;
  max-height: ${props => (props.showMenu ? '200px' : '0px')};
  transition: max-height 0.2s ease-in;
`;

export const MenuItem = styled.div`
  box-sizing: border-box;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;

  display: flex;
  justify-content: ${props => props.firstMenuItem ? 'space-between' : ''};
  align-items: center

  color: ${Colors.DARK_NIGHT};
  background-color: ${Colors.WHITE};

  ${props => props.firstMenuItem ? `
    color: ${Colors.MEDIUM_GRAY};
    border-bottom: 1px solid transparent;
  ` : ''}
`;

export const TabItem = MenuItem.extend.attrs({
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

export const DownArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;

  border-top: 6px solid ${Colors.MEDIUM_GRAY};

  border-radius: 2px;

  display: flex;
  align-self: center;
`;

export const PlaceHolder = styled.span`
  
  color: ${props => props.empty && css`${Colors.WARM_LIGHT}`};
  font-size: 16px;
  // width: ${props => props.searchable && css`85%` || css`100%`};
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export const DropdownContainer = styled.div`
  width: ${props => props.width ? `${props.width}` : '288px'};
  position: relative;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  ${baseInputStyling}

  border-width: 0px;
  height: 100%;
  margin-bottom: 0px;
  font-size: 16px;

  outline: none;

  width: 85%;
  padding-left: 0px;
`;

export const FlexStartAlign = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  font-size: 16px;
  
  color: ${props => props.empty && Colors.WARM_LIGHT};
  // width: ${props => props.searchable && css`90%` || css`100%`};
  width: 100%;

  overflow: hidden;
  white-space: nowrap;
`;

export const StyledSearchIcon = styled(search)`
  width: 16px;
  height: 16px;
  fill: ${Colors.WARM_LIGHT};
  margin-right: 8px;
`;

export const FirstListWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;

  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;