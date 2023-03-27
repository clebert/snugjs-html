/** @jest-environment jsdom */

import {createElement, createFragment} from './index.js';
import {describe, expect, test} from '@jest/globals';

function getChildNodes(node: Node): Node[] {
  return [...node.childNodes];
}

describe(`createFragment()`, () => {
  test(`instance`, () => {
    expect(<></>).toBeInstanceOf(DocumentFragment);
  });

  test(`child nodes`, () => {
    expect(getChildNodes(<></>)).toEqual([]);
    expect(getChildNodes(<>{false}</>)).toEqual([]);
    expect(getChildNodes(<>{true}</>)).toEqual([]);
    expect(getChildNodes(<>{null}</>)).toEqual([]);
    expect(getChildNodes(<>{undefined}</>)).toEqual([]);
    expect(getChildNodes(<>{{}}</>)).toEqual([]);
    expect(getChildNodes(<>{[]}</>)).toEqual([]);
    expect(getChildNodes(<>{0}</>)).toEqual([document.createTextNode(`0`)]);
    expect(getChildNodes(<>{-42}</>)).toEqual([document.createTextNode(`-42`)]);

    expect(getChildNodes(<>{Math.PI}</>)).toEqual([
      document.createTextNode(`${Math.PI}`),
    ]);

    expect(getChildNodes(<>{NaN}</>)).toEqual([document.createTextNode(`NaN`)]);
    expect(getChildNodes(<>{``}</>)).toEqual([document.createTextNode(``)]);

    expect(getChildNodes(<>{`foo`}</>)).toEqual([
      document.createTextNode(`foo`),
    ]);

    expect(getChildNodes(<>{<a />}</>)).toEqual([<a />]);

    expect(getChildNodes(<>{document.createTextNode(`bar`)}</>)).toEqual([
      document.createTextNode(`bar`),
    ]);

    expect(
      getChildNodes(
        <>
          <></>
        </>,
      ),
    ).toEqual([]);

    expect(
      getChildNodes(
        <>
          {0}
          {``}
          {false}
          {[
            <a />,
            <>
              {-42}
              {`foo`}
              {true}
            </>,
          ]}
        </>,
      ),
    ).toEqual([
      document.createTextNode(`0`),
      document.createTextNode(``),
      <a />,
      document.createTextNode(`-42`),
      document.createTextNode(`foo`),
    ]);
  });
});
