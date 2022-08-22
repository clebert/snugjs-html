export class ElementCache {
  static readonly default = new ElementCache();
  static readonly keyAttributeName = `data-snugjs-key`;

  #elementByKey = new WeakMap<JSX.ElementKey, HTMLElement>();
  #keyStrings = new Set<string>();

  createElement(tagName: string, key: JSX.ElementKey | undefined): HTMLElement {
    let element: HTMLElement | undefined;

    if (key) {
      element = this.#elementByKey.get(key);

      if (!element && key.string) {
        if (this.#keyStrings.has(key.string)) {
          throw new Error(
            `The string representation of a key` +
              ` is already associated with another key.`,
          );
        }

        const [unknownElement, ...otherElements] = document.querySelectorAll(
          `[${ElementCache.keyAttributeName}="${key.string}"]`,
        );

        if (otherElements.length > 0) {
          throw new Error(
            `The search for the string representation of a key` +
              ` found more than one element.`,
          );
        }

        element = (unknownElement as HTMLElement) ?? undefined;
      }

      if (element && element.tagName !== tagName.toUpperCase()) {
        throw new Error(
          `A key is already associated with an element of another type.`,
        );
      }
    }

    if (!element) {
      element = document.createElement(tagName);
    }

    if (key) {
      this.#elementByKey.set(key, element);

      if (key.string) {
        this.#keyStrings.add(key.string);
      }
    }

    return element;
  }

  reset(): void {
    this.#elementByKey = new WeakMap<JSX.ElementKey, HTMLElement>();
    this.#keyStrings = new Set<string>();
  }
}
