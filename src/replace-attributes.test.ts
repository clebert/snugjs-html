/**
 * @jest-environment jsdom
 */

import {beforeEach, describe, expect, test} from '@jest/globals';
import {replaceAttributes} from './replace-attributes.js';

describe(`replaceAttributes()`, () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement(`a`);
  });

  test(`existing attributes are always removed`, () => {
    element.setAttribute(`a`, `foo`);
    element.setAttribute(`b`, `bar`);
    expect(element.getAttributeNames()).toEqual([`a`, `b`]);
    replaceAttributes(element, `html`, {});
    expect(element.getAttributeNames()).toEqual([]);
    element.setAttribute(`a`, `foo`);
    element.setAttribute(`b`, `bar`);
    expect(element.getAttributeNames()).toEqual([`a`, `b`]);
    replaceAttributes(element, `html`, {a: `foo`});
    expect(element.getAttributeNames()).toEqual([`a`]);
  });

  test(`boolean values are serialized as HTML`, () => {
    replaceAttributes(element, `html`, {a: false, b: true});
    expect(element.getAttributeNames()).toEqual([`b`]);
    expect(element.getAttribute(`b`)).toBe(`b`);
  });

  test(`boolean values are serialized as JSON`, () => {
    replaceAttributes(element, `json`, {a: false, b: true});
    expect(element.getAttributeNames()).toEqual([`a`, `b`]);
    expect(element.getAttribute(`a`)).toBe(`false`);
    expect(element.getAttribute(`b`)).toBe(`true`);
  });

  test(`finite number values are serialized as HTML`, () => {
    replaceAttributes(element, `html`, {a: 0, b: -42, c: Math.PI});
    expect(element.getAttributeNames()).toEqual([`a`, `b`, `c`]);
    expect(element.getAttribute(`a`)).toBe(`0`);
    expect(element.getAttribute(`b`)).toBe(`-42`);
    expect(element.getAttribute(`c`)).toBe(`${Math.PI}`);
  });

  test(`finite number values are serialized as JSON`, () => {
    replaceAttributes(element, `json`, {a: 0, b: -42, c: Math.PI});
    expect(element.getAttributeNames()).toEqual([`a`, `b`, `c`]);
    expect(element.getAttribute(`a`)).toBe(`0`);
    expect(element.getAttribute(`b`)).toBe(`-42`);
    expect(element.getAttribute(`c`)).toBe(`${Math.PI}`);
  });

  test(`non-finite number values cannot be serialized`, () => {
    expect(() => replaceAttributes(element, `html`, {a: NaN})).toThrowError(
      `Cannot set a non-finite number value for the "a" attribute.`,
    );

    expect(() => replaceAttributes(element, `json`, {a: Infinity})).toThrowError(
      `Cannot set a non-finite number value for the "a" attribute.`,
    );
  });

  test(`string values are serialized as HTML`, () => {
    replaceAttributes(element, `html`, {a: ``, b: `foo`});
    expect(element.getAttributeNames()).toEqual([`a`, `b`]);
    expect(element.getAttribute(`a`)).toBe(``);
    expect(element.getAttribute(`b`)).toBe(`foo`);
  });

  test(`string values are serialized as JSON`, () => {
    replaceAttributes(element, `json`, {a: ``, b: `foo`});
    expect(element.getAttributeNames()).toEqual([`a`, `b`]);
    expect(element.getAttribute(`a`)).toBe(`""`);
    expect(element.getAttribute(`b`)).toBe(`"foo"`);
  });

  test(`undefined values are ignored`, () => {
    replaceAttributes(element, `html`, {a: undefined});
    expect(element.getAttributeNames()).toEqual([]);
    replaceAttributes(element, `json`, {a: undefined});
    expect(element.getAttributeNames()).toEqual([]);
  });

  test(`other values cannot be serialized`, () => {
    expect(() => replaceAttributes(element, `html`, {a: null})).toThrowError(
      `Cannot set an illegal value for the "a" attribute.`,
    );

    expect(() => replaceAttributes(element, `json`, {a: []})).toThrowError(
      `Cannot set an illegal value for the "a" attribute.`,
    );
  });

  test(`the "children" prop is ignored`, () => {
    replaceAttributes(element, `html`, {children: true});
    expect(element.getAttributeNames()).toEqual([]);
    replaceAttributes(element, `json`, {children: true});
    expect(element.getAttributeNames()).toEqual([]);
  });

  test(`the "key" prop is ignored`, () => {
    replaceAttributes(element, `html`, {key: true});
    expect(element.getAttributeNames()).toEqual([]);
    replaceAttributes(element, `json`, {key: true});
    expect(element.getAttributeNames()).toEqual([]);
  });
});
