/**
 * @jest-environment jsdom
 */

import {afterEach, describe, expect, jest, test} from '@jest/globals';
import type {ElementFactory} from './create-element-factory.js';
import {createElement} from './create-element.js';
import {ElementCache} from './element-cache.js';

describe(`createElement()`, () => {
  afterEach(() => {
    ElementCache.default.reset();
  });

  describe(`with tag name`, () => {
    test(`instance type`, () => {
      expect(createElement(`a`, {})).toBeInstanceOf(HTMLAnchorElement);
      expect(<a />).toBeInstanceOf(HTMLAnchorElement);
    });

    test(`key without string`, () => {
      const key: JSX.ElementKey = {};
      const element = createElement(`a`, {key});

      expect(element).toBe(<a key={key} />);
      expect(element.getAttribute(`key`)).toBe(null);
      expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(null);
    });

    test(`key with string`, () => {
      const key: JSX.ElementKey = {string: `foo`};
      const element = createElement(`a`, {key});

      expect(element).toBe(<a key={key} />);
      expect(element.getAttribute(`key`)).toBe(null);
      expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);
    });

    test(`no children`, () => {
      expect(createElement(`div`, {}).childNodes).toHaveLength(0);
      expect((<div />).childNodes).toHaveLength(0);
    });

    test(`single child`, () => {
      const element = createElement(`div`, {}, <a />);

      expect(element.childNodes).toHaveLength(1);
      expect(element.childNodes[0]?.nodeName).toBe(`A`);

      expect(
        (
          <div>
            <a />
          </div>
        ).childNodes,
      ).toHaveLength(1);
    });

    test(`children`, () => {
      const element = createElement(`div`, {}, <a />, <span />);

      expect(element.childNodes).toHaveLength(2);
      expect(element.childNodes[0]?.nodeName).toBe(`A`);
      expect(element.childNodes[1]?.nodeName).toBe(`SPAN`);

      expect(
        (
          <div>
            <a />
            <span />
          </div>
        ).childNodes,
      ).toHaveLength(2);
    });

    test(`replace children`, () => {
      const key: JSX.ElementKey = {};
      const element = createElement(`div`, {key}, <a />, <span />);

      expect(element.childNodes).toHaveLength(2);

      createElement(`div`, {key});

      expect(element.childNodes).toHaveLength(0);
    });

    test(`replace HTML attributes`, () => {
      const key: JSX.ElementKey = {string: `foo`};
      const element = createElement(`a`, {key, href: `example.com`});

      expect(element.getAttribute(`href`)).toBe(`example.com`);
      expect(element.getAttribute(`key`)).toBe(null);
      expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);

      createElement(`a`, {key});

      expect(element.getAttribute(`href`)).toBe(null);
      expect(element.getAttribute(`key`)).toBe(null);
      expect(element.getAttribute(ElementCache.keyAttributeName)).toBe(`foo`);
    });
  });

  describe(`with element factory`, () => {
    const element = <a />;
    const Test = jest.fn<ElementFactory<{readonly a?: string}>>(() => element);

    test(`attributes`, () => {
      expect(createElement(Test, {key: {}, a: `foo`})).toBe(element);
      expect(<Test key={{}} a="foo" />).toBe(element);
      expect(Test).toHaveBeenCalledTimes(2);
      expect(Test.mock.calls[0]).toEqual([{key: {}, a: `foo`, children: []}]);
      expect(Test.mock.calls[1]).toEqual([{key: {}, a: `foo`, children: []}]);
    });

    test(`single child`, () => {
      expect(createElement(Test, {}, `foo`)).toBe(element);
      expect(<Test>foo</Test>).toBe(element);
      expect(Test).toHaveBeenCalledTimes(2);
      expect(Test.mock.calls[0]).toEqual([{children: [`foo`]}]);
      expect(Test.mock.calls[1]).toEqual([{children: [`foo`]}]);
    });

    test(`children`, () => {
      expect(createElement(Test, {}, `foo`, <span />)).toBe(element);

      expect(
        <Test>
          foo
          <span />
        </Test>,
      ).toBe(element);

      expect(Test).toHaveBeenCalledTimes(2);
      expect(Test.mock.calls[0]).toEqual([{children: [`foo`, <span />]}]);
      expect(Test.mock.calls[1]).toEqual([{children: [`foo`, <span />]}]);
    });
  });
});
