import Block from "../../core/Block";
import template from "./FormField.hbs?raw";
import { VALIDATION_RULES, VALIDATION_ERRORS } from "../../core/utils/validations";

interface FormFieldProps {
  [key: string]: unknown;
}

export default class FormField extends Block<FormFieldProps> {
  constructor(props: FormFieldProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  private _value() {
    const htmlInputElement = this.refs.input.element as HTMLInputElement;
    return htmlInputElement.value;
  }

  public value() {
    this.validate();
    return this._value();
  }

  private _validate() {
    const inputElement = this.refs.input.element as HTMLInputElement;

    const validateRule = VALIDATION_RULES[inputElement.name];

    if (!validateRule) return true;

    return VALIDATION_RULES[inputElement.name].test(inputElement.value);
  }

  public validate(): Boolean {
    const isValid = this._validate();
    if (isValid) {
      this.setProps({ ...this.props, error: null, value: this._value() });
      return true;
    }
    const inputElement = this.refs.input.element as HTMLInputElement;
    this.setProps({
      ...this.props,
      error: VALIDATION_ERRORS[inputElement.name],
      value: this._value(),
    });
    return false;
  }
}
