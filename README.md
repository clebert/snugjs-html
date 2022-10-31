# @snugjs/html

> Create HTML elements and fragments using JSX.

## Installation

```
npm install @snugjs/html
```

## Hello World

```jsx
import {createElement} from '@snugjs/html';

document.body.appendChild(<h1>Hello, World!</h1>);
document.body.appendChild(createElement('h1', {}, 'Hello, World!'));
```

## `<Hello />` Element Factory

```jsx
import {createElement, createElementFactory} from '@snugjs/html';

const Hello = createElementFactory('h1', (element, childNodes) => {
  element.replaceChildren('Hello, ', ...childNodes, '!');
});

document.body.appendChild(<Hello>World</Hello>);
```

## TypeScript Configuration

```json
{
  "jsx": "react",
  "jsxFactory": "createElement",
  "jsxFragmentFactory": "createFragment"
}
```
