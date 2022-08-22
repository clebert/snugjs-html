/**
 * @jest-environment jsdom
 */

import {describe, expect, test} from '@jest/globals';
import {createFragment} from './create-fragment.js';

const getChildNodes = (fragment: DocumentFragment) =>
  [...fragment.childNodes].map(({nodeName, textContent}) => `${nodeName}:${textContent}`);

describe(`createFragment()`, () => {
  test(`instance type`, () => {
    expect(createFragment({})).toBeInstanceOf(DocumentFragment);
  });

  test(`number values`, () => {
    expect(getChildNodes(createFragment({children: 0}))).toEqual([`#text:0`]);
    expect(getChildNodes(createFragment({children: -42}))).toEqual([`#text:-42`]);
    expect(getChildNodes(createFragment({children: Math.PI}))).toEqual([`#text:${Math.PI}`]);
    expect(getChildNodes(createFragment({children: NaN}))).toEqual([`#text:NaN`]);
  });

  test(`string values`, () => {
    expect(getChildNodes(createFragment({children: ``}))).toEqual([`#text:`]);
    expect(getChildNodes(createFragment({children: `foo`}))).toEqual([`#text:foo`]);
  });

  test(`other values`, () => {
    expect(getChildNodes(createFragment({}))).toEqual([]);
    expect(getChildNodes(createFragment({children: false}))).toEqual([]);
    expect(getChildNodes(createFragment({children: true}))).toEqual([]);
    expect(getChildNodes(createFragment({children: null}))).toEqual([]);
    expect(getChildNodes(createFragment({children: undefined}))).toEqual([]);
    expect(getChildNodes(createFragment({children: {}}))).toEqual([]);
  });

  test(`HTML elements and fragments`, () => {
    expect(getChildNodes(createFragment({children: document.createElement(`a`)}))).toEqual([`A:`]);
    expect(getChildNodes(createFragment({children: createFragment({})}))).toEqual([]);

    expect(
      getChildNodes(createFragment({children: createFragment({children: [document.createElement(`a`)]})})),
    ).toEqual([`A:`]);
  });

  test(`arrays`, () => {
    expect(getChildNodes(createFragment({children: []}))).toEqual([]);

    expect(
      getChildNodes(
        createFragment({
          children: [0, ``, false, [document.createElement(`a`), createFragment({children: [-42, `foo`, true]})]],
        }),
      ),
    ).toEqual([`#text:0`, `#text:`, `A:`, `#text:-42`, `#text:foo`]);
  });
});
