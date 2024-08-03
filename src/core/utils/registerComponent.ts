import Handlebars, { HelperOptions } from "handlebars";
import Block from "../Block";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
    const component = new Component(hash);
    const dataAttribute = `data-id="${component.id}"`;
    /* eslint-disable no-param-reassign */
    if ("ref" in hash) {
      data.root.__refs = data.root.__refs || {};

      data.root.__refs[hash.ref] = component;
    }

    data.root.__children = data.root.__children || [];
    /* eslint-enable no-param-reassign */

    data.root.__children.push({
      component,
      insert(fragment: DocumentFragment) {
        const stub = fragment.querySelector(`[${dataAttribute}]`);

        if (!stub) return;

        component.element?.append(...Array.from(stub.childNodes));

        stub.replaceWith(component.element!);
      },
    });

    const contents = fn ? fn(this) : "";
    return `<div ${dataAttribute}>${contents}</div>`;
  });
}
