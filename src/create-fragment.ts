export function createFragment(
  props: JSX.ElementChildrenAttribute,
): DocumentFragment {
  const {children} = props;
  const fragment = document.createDocumentFragment();

  if (Array.isArray(children)) {
    for (const child of children) {
      fragment.appendChild(createFragment({children: child}));
    }
  } else if (
    children instanceof HTMLElement ||
    children instanceof DocumentFragment
  ) {
    fragment.appendChild(children);
  } else if (typeof children === `string` || typeof children === `number`) {
    fragment.append(String(children));
  }

  return fragment;
}
