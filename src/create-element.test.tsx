/** @jest-environment jsdom */

import type {ElementFactory} from './index.js';

import {createElement, createElementFactory, elementByKey} from './index.js';
import {
  beforeAll,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals';

class CustomElement extends HTMLElement {}

describe(`createElement()`, () => {
  beforeAll(() => {
    customElements.define(`x-custom`, CustomElement);
  });

  const callback = jest.fn();

  let Custom: ElementFactory<{
    boolean?: boolean;
    number?: number;
    string?: string;
    null?: null;
    unknown?: unknown;
  }>;

  beforeEach(() => {
    Custom = createElementFactory(`x-custom`, callback);
  });

  test(`instance`, () => {
    expect(<a />).toBeInstanceOf(HTMLAnchorElement);
    expect(<Custom />).toBeInstanceOf(CustomElement);
    expect(<a />).not.toBeInstanceOf(CustomElement);
    expect(<Custom />).not.toBeInstanceOf(HTMLAnchorElement);
  });

  test(`key`, () => {
    const key1 = {};
    const key2 = {};

    expect(<a />).not.toBe(<a />);
    expect(<Custom />).not.toBe(<Custom />);
    expect(<a key={key1} />).toBe(<a key={key1} />);
    expect(<Custom key={key2} />).toBe(<Custom key={key2} />);
    expect(<a key={key1} />).not.toBe(<a key={{}} />);
    expect(<Custom key={key2} />).not.toBe(<Custom key={{}} />);
    expect(() => <a key={key2} />).toThrowError(`cannot use key with tag: a`);

    expect(() => <Custom key={key1} />).toThrowError(
      `cannot use key with tag: x-custom`,
    );

    expect(<a key={key1} />).toBe(elementByKey.get(key1));
    expect(<Custom key={key2} />).toBe(elementByKey.get(key2));
  });

  test(`attributes`, () => {
    const key = {};

    const customElement = (
      <Custom key={key} boolean number={42} string="test" null={null} />
    ) as CustomElement;

    expect(customElement.getAttributeNames()).toEqual([
      `boolean`,
      `number`,
      `string`,
    ]);

    expect(customElement.getAttribute(`boolean`)).toBe(``);
    expect(customElement.getAttribute(`number`)).toBe(`42`);
    expect(customElement.getAttribute(`string`)).toBe(`test`);

    <Custom key={key} />;

    expect(customElement.getAttributeNames()).toEqual([]);
    expect(customElement.getAttribute(`boolean`)).toBe(null);
    expect(customElement.getAttribute(`number`)).toBe(null);
    expect(customElement.getAttribute(`string`)).toBe(null);

    <Custom key={key} boolean={false} number={NaN} string="" null={null} />;

    expect(customElement.getAttributeNames()).toEqual([`number`, `string`]);
    expect(customElement.getAttribute(`boolean`)).toBe(null);
    expect(customElement.getAttribute(`number`)).toBe(`NaN`);
    expect(customElement.getAttribute(`string`)).toBe(``);

    <Custom
      key={key}
      boolean={undefined}
      number={undefined}
      string={undefined}
      null={undefined}
    />;

    expect(customElement.getAttributeNames()).toEqual([]);
    expect(customElement.getAttribute(`boolean`)).toBe(null);
    expect(customElement.getAttribute(`number`)).toBe(null);
    expect(customElement.getAttribute(`string`)).toBe(null);

    expect(() => <Custom key={key} unknown={{}} />).toThrowError(
      `cannot set attribute: unknown`,
    );

    expect(() => <Custom key={key} unknown={[]} />).toThrowError(
      `cannot set attribute: unknown`,
    );

    expect(() => <Custom key={key} unknown={Symbol()} />).toThrowError(
      `cannot set attribute: unknown`,
    );
  });

  test(`child nodes`, () => {
    const anchorElement = (
      <a>
        {`foo`}
        {`bar`}
      </a>
    ) as HTMLAnchorElement;

    const customElement = (
      <Custom>
        {`foo`}
        {`bar`}
      </Custom>
    ) as CustomElement;

    const childNodes = [
      document.createTextNode(`foo`),
      document.createTextNode(`bar`),
    ];

    expect(Array.from(anchorElement.childNodes)).toEqual(childNodes);
    expect(anchorElement.getAttributeNames()).toEqual([]);
    expect(customElement.childNodes).toHaveLength(0);
    expect(customElement.getAttributeNames()).toEqual([]);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenNthCalledWith(1, customElement, childNodes);
  });
});
