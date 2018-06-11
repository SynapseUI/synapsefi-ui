import button from './components/Button';
import btnGroup from './components/ButtonGroup';
import closeBtn from './components/CloseButton';
import modal from './components/Modal';
import * as svgIcons from './components/SvgIcons';
import table from './components/Table';

import FormLabel from './components/Label/Label';
import FormErrorMessage from './components/ErrorMessage/ErrorMessage';
import FormAlertMessage from './components/AlertMessage/AlertMessage';

import FormInput from './components/Input/Input';
import FormTextarea from './components/Textarea/Textarea';
import FormCheckboxGroup from './components/CheckboxGroup/CheckboxGroup';
import FormRadioGroup from './components/RadioGroup/RadioGroup';
import FormDropdown from './components/Dropdown/Dropdown';

import FormDropdownContent from './components/Dropdown/components/DropdownContent';
import FormDropdownHead from './components/Dropdown/components/DropdownHead';

import MainForm from './components/Form/Form';
import MainFormTypeConstants from './components/Form/util/FormTypeConstants';

import Colors from './colors';

export const colors = Colors;

export const Button = button;
export const ButtonGroup = btnGroup;
export const CloseButton = closeBtn;
export const Modal = modal;
export const SvgIcons = svgIcons;
export const Table = table;

export const Label = FormLabel;
export const ErrorMessage = FormErrorMessage;
export const AlertMessage = FormAlertMessage;
 
export const Input = FormInput;
export const Textarea = FormTextarea;
export const CheckboxGroup = FormCheckboxGroup;
export const RadioGroup = FormRadioGroup;
export const Dropdown = FormDropdown;

export const DropdownContent = FormDropdownContent;
export const DropdownHead = FormDropdownHead;

export const Form = MainForm;
export const FormTypeConstants = MainFormTypeConstants();

