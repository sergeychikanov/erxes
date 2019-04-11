import { withFormsy } from 'formsy-react';
import * as React from 'react';
import {
  Checkbox,
  FormLabel,
  Input,
  Radio,
  Select,
  SelectWrapper
} from './styles';
import Textarea from './Textarea';

type Props = {
  validations: string[];
  validationError: string;
  getErrorMessages: () => void;
  children?: React.ReactNode;
  id?: string;
  onChange?: (e: React.FormEvent<HTMLElement>) => void;
  onClick?: (e: React.MouseEvent) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
  defaultValue?: any;
  value?: any;
  defaultChecked?: boolean;
  checked?: boolean;
  placeholder?: string;
  type?: string;
  name?: string;
  options?: any[];
  required?: boolean;
  disabled?: boolean;
  round?: boolean;
  autoFocus?: boolean;
  onFocus?: (e: React.FormEvent<HTMLElement>) => void;
  componentClass?: string;
  min?: number;
  max?: number;
  rows?: number;
  inline?: boolean;
  className?: string;
};

type IFormsyDecorator = {
  getErrorMessage(): any;
  getValue(): any;
  hasValue(): boolean;
  isFormDisabled(): boolean;
  isFormSubmitted(): boolean;
  isPristine(): boolean;
  isRequired(): boolean;
  isValid(): boolean;
  isValidValue(): boolean;
  resetValue(): void;
  setValidations(validations: any, required: boolean): void;
  setValue(value: any): void;
  showError(): boolean;
  showRequired(): boolean;
};

const renderElement = (Element, attributes, type, child) => {
  return (
    <FormLabel key={attributes.key ? attributes.key : null}>
      <Element {...attributes} type={type} />
      <span>
        {child && '\u00a0\u00a0'}
        {child}
      </span>
    </FormLabel>
  );
};

class EnhancedFormControl extends React.Component<Props & IFormsyDecorator> {
  static defaultProps = {
    componentClass: 'input',
    required: false,
    defaultChecked: false,
    disabled: false
  };

  // cancel custom browser default form validation error
  onChange = e => {
    e.target.classList.remove('form-invalid');

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const props = this.props;
    const childNode = props.children;
    const elementType = props.componentClass;

    const errorMessage =
      typeof props.isPristine === 'function'
        ? props.isPristine()
          ? null
          : props.getErrorMessage()
        : null;

    const attributes = {
      onChange: this.onChange,
      onKeyPress: props.onKeyPress,
      onClick: props.onClick,
      value: props.value,
      defaultValue: props.defaultValue,
      [props.defaultChecked
        ? 'defaultChecked'
        : 'checked']: props.defaultChecked
        ? props.defaultChecked
        : props.checked,
      placeholder: props.placeholder,
      type: props.type,
      name: props.name,
      round: props.round,
      required: props.required,
      disabled: props.disabled,
      onFocus: props.onFocus,
      autoFocus: props.autoFocus,
      min: props.min,
      max: props.max,
      id: props.id
    };

    if (elementType === 'select') {
      if (props.options) {
        return (
          <>
            <SelectWrapper>
              <Select {...attributes}>
                {props.options.map((option, index) => {
                  return (
                    <option key={index} value={option.value || ''}>
                      {option.label || ''}
                    </option>
                  );
                })}
              </Select>
            </SelectWrapper>
            <span>{errorMessage}</span>
          </>
        );
      }
      return (
        <>
          <SelectWrapper>
            <Select {...attributes}>{childNode}</Select>
          </SelectWrapper>
          <span>{errorMessage}</span>
        </>
      );
    }

    if (elementType === 'radio') {
      if (props.options) {
        return props.options.map((option, index) => {
          return renderElement(
            Radio,
            { key: index, ...attributes, ...option },
            elementType,
            option.childNode
          );
        });
      }

      return renderElement(Radio, attributes, elementType, childNode);
    }

    if (elementType === 'checkbox') {
      return renderElement(Checkbox, attributes, elementType, childNode);
    }

    if (elementType === 'textarea') {
      return (
        <>
          <Textarea {...props} />
          <span>{errorMessage}</span>
        </>
      );
    }

    return (
      <>
        <Input {...attributes} />
        <span>{errorMessage}</span>
      </>
    );
  }
}

class WithFormsy extends React.Component<Props & IFormsyDecorator> {
  onChange = e => {
    return this.props.setValue((e.currentTarget as HTMLTextAreaElement).value);
  };

  render() {
    const props = {
      ...this.props,
      onChange: this.onChange,
      value: this.props.getValue() || ''
    };

    return <EnhancedFormControl {...props} />;
  }
}

const WithFormsyContainer = withFormsy(WithFormsy);

const FormControl = props => {
  if (props.validations) {
    return <WithFormsyContainer {...props} />;
  }

  return <EnhancedFormControl {...props} />;
};

export default FormControl;
