import {createFragment} from './create-fragment.js';
import {ElementCache} from './element-cache.js';
import {replaceAttributes} from './replace-attributes.js';

export type ElementFactory<TProps extends object> = (
  props: TProps & JSX.ElementChildrenAttribute & JSX.ElementKeyAttribute,
) => JSX.Element;

export interface ElementFactoryCallbackArgs {
  readonly element: JSX.Element;
  readonly child: DocumentFragment;
}

export function createElementFactory<TProps extends object>(
  tagName: string,
  attributeFormat: 'html' | 'json',
  callback: (args: ElementFactoryCallbackArgs) => void,
): ElementFactory<TProps> {
  return (props) => {
    const {children, key} = props;
    const element = ElementCache.default.createElement(tagName, key);

    replaceAttributes(element, attributeFormat, props);

    if (key?.string) {
      element.setAttribute(ElementCache.keyAttributeName, key.string);
    }

    callback({element, child: createFragment({children})});

    return element;
  };
}
