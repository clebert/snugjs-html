export function replaceAttributes(
  element: HTMLElement,
  format: 'html' | 'json',
  props: object,
): void {
  for (const attributeName of element.getAttributeNames()) {
    element.removeAttribute(attributeName);
  }

  for (const [propName, propValue] of Object.entries(props)) {
    if (propName === `children` || propName === `key`) {
      continue;
    }

    switch (typeof propValue) {
      case `boolean`: {
        if (format === `json`) {
          element.setAttribute(propName, String(propValue));
        } else if (propValue === true) {
          element.setAttribute(propName, propName);
        }

        break;
      }
      case `number`: {
        if (Number.isFinite(propValue)) {
          element.setAttribute(propName, String(propValue));
        } else {
          throw new Error(
            `Cannot set a non-finite number value for the "${propName}" attribute.`,
          );
        }

        break;
      }
      case `string`: {
        if (format === `json`) {
          element.setAttribute(propName, JSON.stringify(propValue));
        } else {
          element.setAttribute(propName, propValue);
        }

        break;
      }
      case `undefined`: {
        break;
      }
      default: {
        throw new Error(
          `Cannot set an illegal value for the "${propName}" attribute.`,
        );
      }
    }
  }
}
