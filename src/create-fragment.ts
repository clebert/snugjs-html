import type {createElement} from './create-element.js';

export function createFragment(
  props: createElement.JSX.ElementChildrenAttribute,
): DocumentFragment {
  const {children} = props;
  const fragment = document.createDocumentFragment();

  if (Array.isArray(children)) {
    for (const child of children) {
      fragment.appendChild(createFragment({children: child}));
    }
  } else if (children instanceof Node) {
    fragment.appendChild(children);
  } else if (typeof children === `number` || typeof children === `string`) {
    fragment.append(`${children}`);
  }

  return fragment;
}
