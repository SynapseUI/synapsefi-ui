import anchorButton from './components/buttonRelated/AnchorButton'
import btnGroup from './components/buttonRelated/ButtonGroup';
import button from './components/buttonRelated/Button';
import closeBtn from './components/buttonRelated/CloseButton';

import modal from './components/modalRelated/Modal';
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
import FormAccordion from './components/Accordion/Accordion';

import MainForm from './components/Form/Form';
import MainFormTypeConstants from './components/Form/util/FormTypeConstants';

import Colors from './colors';

export const colors = Colors;

// button related
export const AnchorButton = anchorButton;
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
export const Accordion = FormAccordion;

export const Form = MainForm;
export const FormTypeConstants = MainFormTypeConstants();

