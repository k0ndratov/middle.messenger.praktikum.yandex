import Block from "../../core/Block";
import template from "./FileInput.hbs?raw";

interface FileInputProps {
  onSelectFile: () => void;
  [key: string]: unknown;
}

export default class FileInput extends Block<FileInputProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
    });
  }

  public getFile(): File | undefined {
    const inputElement = this.refs.avatar.element as HTMLInputElement;

    return inputElement.files?.[0];
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
