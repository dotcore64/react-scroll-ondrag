# react-scroll-ondrag

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coverage Status][coveralls-badge]][coveralls]
[![Dependency Status][dependency-status-badge]][dependency-status]
[![devDependency Status][dev-dependency-status-badge]][dev-dependency-status]

> Scroll your elements by dragging your mouse

## Live demo

You can see the simplest demo here: [Live demo](https://codesandbox.io/s/react-scroll-ondrag-demo-v001-2dhu1)

## Install

```bash
$ npm install --save react-scroll-ondrag
```

## Examples

Run examples:

```bash
$ cd examples
$ npm install
$ npm start
```

## Usage

```javascript
import React, { useRef } from 'react';
import useScrollOnDrag from 'react-scroll-ondrag';

const App = () => {
  const ref = useRef();
  const { events } = useScrollOnDrag(ref);

  return <div {...events} ref={ref} />;
};
```

## Arguments

### ref

Type: a React `ref`, required

A `ref` to the DOM element whose scroll position you want to control

### options

Type: `object`

#### options.runScroll

Type: `function: ({ dx: Integer, dy: Integer }) => void`
Default:

```javascript
// ref is the first argument to the hook, documented above
({ dx, dy }) => {
  const maxHorizontalScroll = dom => dom.scrollWidth - dom.clientWidth;
  const maxVerticalScroll = dom => dom.scrollHeight - dom.clientHeight;

  const offsetX = Math.min(maxHorizontalScroll(ref.current), ref.current.scrollLeft + dx);
  ref.current.scrollLeft = offsetX; // eslint-disable-line no-param-reassign

  const offsetY = Math.min(maxVerticalScroll(ref.current), ref.current.scrollTop + dy);
  ref.current.scrollTop = offsetY; // eslint-disable-line no-param-reassign
}
```

Used to customize scroll, i.e., scroll only in horizontal direction, change scroll speed, etc

#### options.onDragStart

Type: `function: () => void`

Called when scrolling by dragging starts

#### options.onDragEnd

Type: `function: () => void`

Called when scrolling by dragging ends

## Return value

Type: `object`, shape: `{ events: { onMouseDown } }`

An object with the events to inject to the controlled element.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).

[build-badge]: https://img.shields.io/travis/perrin4869/react-scroll-ondrag/master.svg?style=flat-square
[build]: https://travis-ci.org/perrin4869/react-scroll-ondrag

[npm-badge]: https://img.shields.io/npm/v/react-scroll-ondrag.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-scroll-ondrag

[coveralls-badge]: https://img.shields.io/coveralls/perrin4869/react-scroll-ondrag/master.svg?style=flat-square
[coveralls]: https://coveralls.io/r/perrin4869/react-scroll-ondrag

[dependency-status-badge]: https://david-dm.org/perrin4869/react-scroll-ondrag.svg?style=flat-square
[dependency-status]: https://david-dm.org/perrin4869/react-scroll-ondrag

[dev-dependency-status-badge]: https://david-dm.org/perrin4869/react-scroll-ondrag/dev-status.svg?style=flat-square
[dev-dependency-status]: https://david-dm.org/perrin4869/react-scroll-ondrag#info=devDependencies
