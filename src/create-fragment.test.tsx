/** @jest-environment jsdom */
/** @jsx createElement */
/** @jsxFrag createFragment */

import {describe, expect, test} from '@jest/globals';
import {createElement, createFragment} from './index.js';

function getChildren(node: Node): Node[] {
  return [...node.childNodes];
}

describe(`createFragment()`, () => {
  test(`instance`, () => {
    expect(<></>).toBeInstanceOf(DocumentFragment);
  });

  test(`children`, () => {
    expect(getChildren(<></>)).toEqual([]);
    expect(getChildren(<>{false}</>)).toEqual([]);
    expect(getChildren(<>{true}</>)).toEqual([]);
    expect(getChildren(<>{null}</>)).toEqual([]);
    expect(getChildren(<>{undefined}</>)).toEqual([]);
    expect(getChildren(<>{{}}</>)).toEqual([]);
    expect(getChildren(<>{[]}</>)).toEqual([]);
    expect(getChildren(<>{0}</>)).toEqual([document.createTextNode(`0`)]);
    expect(getChildren(<>{-42}</>)).toEqual([document.createTextNode(`-42`)]);
    expect(getChildren(<>{Math.PI}</>)).toEqual([document.createTextNode(`${Math.PI}`)]);
    expect(getChildren(<>{NaN}</>)).toEqual([document.createTextNode(`NaN`)]);
    expect(getChildren(<>{``}</>)).toEqual([document.createTextNode(``)]);
    expect(getChildren(<>{`foo`}</>)).toEqual([document.createTextNode(`foo`)]);
    expect(getChildren(<>{<a />}</>)).toEqual([<a />]);
    expect(getChildren(<>{document.createTextNode(`bar`)}</>)).toEqual([document.createTextNode(`bar`)]);

    expect(
      getChildren(
        <>
          <></>
        </>,
      ),
    ).toEqual([]);

    expect(
      getChildren(
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
