import type {createElement} from './create-element.js';
import {createFragment} from './create-fragment.js';

export type ElementFactory<TProps extends object> = (
  props: TProps &
    createElement.JSX.ElementChildrenAttribute &
    createElement.JSX.ElementKeyAttribute,
) => createElement.JSX.Element;

const elementByKey = new WeakMap<object, HTMLElement>();

export function createElementFactory<TProps extends object>(
  tagName: string,
  callback: (
    element: createElement.JSX.Element,
    children: DocumentFragment,
  ) => void,
): ElementFactory<TProps> {
  return ({children, key, ...props}) => {
    const element =
      (key && elementByKey.get(key)) ?? document.createElement(tagName);

    if (key) {
      if (element.tagName !== tagName.toUpperCase()) {
        throw new Error(`cannot use key with tag: ${tagName}`);
      }

      elementByKey.set(key, element);
    }

    for (const attributeName of element.getAttributeNames()) {
      element.removeAttribute(attributeName);
    }

    for (const [propName, propValue] of Object.entries(props)) {
      switch (typeof propValue) {
        case `boolean`: {
          if (propValue === true) {
            element.setAttribute(propName, ``);
          }

          break;
        }
        case `number`:
        case `string`: {
          element.setAttribute(propName, `${propValue}`);

          break;
        }
        default: {
          if (propValue != null) {
            throw new TypeError(`cannot set attribute: ${propName}`);
          }
        }
      }
    }

    callback(element, createFragment({children}));

    return element;
  };
}
