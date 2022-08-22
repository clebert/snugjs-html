import type {ElementFactory} from './create-element-factory.js';
import {createElementFactory} from './create-element-factory.js';

export function createElement<TTagName extends keyof JSX.IntrinsicElements>(
  tag: TTagName,
  props: Omit<JSX.IntrinsicElements[TTagName], 'children'>,
  ...children: readonly unknown[]
): HTMLElementTagNameMap[TTagName];

export function createElement<TProps extends object>(
  tag: ElementFactory<TProps>,
  props: TProps & JSX.ElementKeyAttribute,
  ...children: readonly unknown[]
): JSX.Element;

export function createElement(
  tag: string | ElementFactory<object>,
  props: object | null,
  ...children: readonly unknown[]
): any {
  const elementFactory =
    typeof tag === `string`
      ? createElementFactory(tag, `html`, ({element, child}) =>
          element.replaceChildren(child),
        )
      : tag;

  return elementFactory({...props, children});
}
