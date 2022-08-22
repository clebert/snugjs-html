/**
 * @jest-environment jsdom
 */

import {afterEach, describe, expect, jest, test} from '@jest/globals';
import {createElementFactory} from './create-element-factory.js';
import {createFragment} from './create-fragment.js';
import {ElementCache} from './element-cache.js';

class TestElement extends HTMLElement {}

window.customElements.define(`x-test`, TestElement);

describe(`createElementFactory()`, () => {
  const callback = jest.fn();
  const htmlElementFactory = createElementFactory<JSX.IntrinsicElements['a']>(`a`, `html`, callback);
  const jsonElementFactory = createElementFactory<{readonly a?: string}>(`x-test`, `json`, callback);

  afterEach(() => {
    ElementCache.default.reset();
  });

  test(`instance type`, () => {
    expect(htmlElementFactory({})).toBeInstanceOf(HTMLAnchorElement);
    expect(jsonElementFactory({})).toBeInstanceOf(TestElement);
  });

  test(`key without string`, () => {
    const key: JSX.ElementKey = {};
    const element = jsonElementFactory({key}) as TestElement;

    expect(element).toBe(jsonElementFactory({key}));
    expect(element.getAttribute(`key`)).toBe(null);
    expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(null);
  });

  test(`key with string`, () => {
    const key: JSX.ElementKey = {string: `foo`};
    const element = jsonElementFactory({key}) as TestElement;

    expect(element).toBe(jsonElementFactory({key}));
    expect(element.getAttribute(`key`)).toBe(null);
    expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);
  });

  test(`no children`, () => {
    const element = jsonElementFactory({}) as TestElement;

    expect(element.childNodes).toHaveLength(0);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.lastCall?.[0]).toEqual({element, child: createFragment({})});
  });

  test(`single child`, () => {
    const element = jsonElementFactory({children: `foo`}) as TestElement;

    expect(element.childNodes).toHaveLength(0);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.lastCall?.[0]).toEqual({element, child: createFragment({children: `foo`})});
  });

  test(`children`, () => {
    const element = jsonElementFactory({children: [`foo`, `bar`]}) as TestElement;

    expect(element.childNodes).toHaveLength(0);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback.mock.lastCall?.[0]).toEqual({element, child: createFragment({children: [`foo`, `bar`]})});
  });

  test(`replace HTML attributes`, () => {
    const key: JSX.ElementKey = {string: `foo`};
    const element = htmlElementFactory({key, href: `example.com`}) as HTMLAnchorElement;

    expect(element.getAttribute(`href`)).toBe(`example.com`);
    expect(element.getAttribute(`key`)).toBe(null);
    expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);

    htmlElementFactory({key});

    expect(element.getAttribute(`href`)).toBe(null);
    expect(element.getAttribute(`key`)).toBe(null);
    expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);
  });

  test(`replace JSON attributes`, () => {
    const key: JSX.ElementKey = {string: `foo`};
    const element = jsonElementFactory({key, a: `bar`}) as HTMLAnchorElement;

    expect(element.getAttribute(`a`)).toBe(`"bar"`);
    expect(element.getAttribute(`key`)).toBe(null);
    expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);

    jsonElementFactory({key});

    expect(element.getAttribute(`a`)).toBe(null);
    expect(element.getAttribute(`key`)).toBe(null);
    expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);
  });
});
