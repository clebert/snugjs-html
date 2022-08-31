/**
 * @jest-environment jsdom
 */

import {afterEach, beforeEach, describe, expect, test} from '@jest/globals';
import {ElementCache} from './element-cache.js';

describe(`ElementCache`, () => {
  afterEach(() => {
    ElementCache.default.reset();
  });

  test(`undefined key`, () => {
    expect(ElementCache.default.createElement(`a`, undefined)).toBeInstanceOf(HTMLAnchorElement);

    expect(ElementCache.default.createElement(`a`, undefined)).not.toBe(
      ElementCache.default.createElement(`a`, undefined),
    );

    expect(ElementCache.default.createElement(`div`, undefined)).toBeInstanceOf(HTMLDivElement);

    expect(ElementCache.default.createElement(`div`, undefined)).not.toBe(
      ElementCache.default.createElement(`div`, undefined),
    );
  });

  describe(`key without string`, () => {
    test(`unknown key`, () => {
      expect(ElementCache.default.createElement(`a`, {})).toBeInstanceOf(HTMLAnchorElement);
      expect(ElementCache.default.createElement(`a`, {})).not.toBe(ElementCache.default.createElement(`a`, {}));
      expect(ElementCache.default.createElement(`div`, {})).toBeInstanceOf(HTMLDivElement);
      expect(ElementCache.default.createElement(`div`, {})).not.toBe(ElementCache.default.createElement(`div`, {}));
    });

    test(`known key`, () => {
      const key = {};

      expect(ElementCache.default.createElement(`a`, key)).toBe(ElementCache.default.createElement(`a`, key));
    });

    test(`already associated key`, () => {
      const key = {};

      ElementCache.default.createElement(`a`, key);

      expect(() => ElementCache.default.createElement(`div`, key)).toThrow(
        `A key is already associated with an element of another type.`,
      );
    });
  });

  describe(`key with string`, () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement(`a`);

      element.setAttribute(ElementCache.keyAttributeName, `foo`);
    });

    afterEach(() => {
      document.body.replaceChildren();
    });

    test(`non-existent key string`, () => {
      const key = {string: `foo`};

      expect(ElementCache.default.createElement(`a`, key)).toBeInstanceOf(HTMLAnchorElement);
      expect(ElementCache.default.createElement(`a`, key)).toBe(ElementCache.default.createElement(`a`, key));
      expect(ElementCache.default.createElement(`a`, key)).not.toBe(element);

      expect(ElementCache.default.createElement(`a`, key)).not.toBe(
        ElementCache.default.createElement(`a`, {string: `bar`}),
      );
    });

    test(`existing key string`, () => {
      const key = {string: `foo`};

      document.body.appendChild(element);

      expect(ElementCache.default.createElement(`a`, key)).toBe(element);
      expect(ElementCache.default.createElement(`a`, {})).not.toBe(element);
      expect(ElementCache.default.createElement(`a`, {string: `bar`})).not.toBe(element);

      element.remove();

      expect(ElementCache.default.createElement(`a`, key)).toBe(element);

      document.body.appendChild(element);

      expect(ElementCache.default.createElement(`a`, key)).toBe(element);
    });

    test(`duplicate key string`, () => {
      ElementCache.default.createElement(`a`, {string: `foo`});

      expect(() => ElementCache.default.createElement(`a`, {string: `foo`})).toThrow(
        `The string representation of a key is already associated with another key.`,
      );
    });

    test(`multiple existing key strings`, () => {
      document.body.appendChild(element);
      document.body.appendChild(element.cloneNode());

      expect(() => ElementCache.default.createElement(`a`, {string: `foo`})).toThrow(
        `The search for the string representation of a key found more than one element.`,
      );
    });

    test(`already associated key`, () => {
      document.body.appendChild(element);

      expect(() => ElementCache.default.createElement(`div`, {string: `foo`})).toThrow(
        `A key is already associated with an element of another type.`,
      );
    });
  });
});
