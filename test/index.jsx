import React, { StrictMode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Simulate, act } from 'react-dom/test-utils';
import styled from 'styled-components';

import { expect } from 'chai';

import useScrollOnDrag from '../src';

const noop = () => {};

const Container = styled.div`
  display: inline-block;
  width: 1000px;
  height: 250px;
  overflow-x: scroll;
  overflow-y: hidden;
  border: 1px solid #000;
  padding: 0 5px;
  white-space: nowrap;
`;

const Box = styled.div`
  display: inline-block;
  height: 100%;
  margin: 5px 10px;
  width: 250px;
  background-color: #F00;
`;

describe('react-stay-scrolled', () => {
  const TestComponent = () => {
    const containerRef = useRef(null);
    const { events } = useScrollOnDrag(containerRef);

    return (
      <Container {...events} ref={containerRef}>
        {[...Array(30).keys()].map(i => <Box key={i} />)}
      </Container>
    );
  };

  function render(element, container, cb = noop) {
    act(() => {
      ReactDOM.render((
        <StrictMode>
          {element}
        </StrictMode>
      ), container, cb);
    });
  }

  let root;

  beforeEach(() => {
    root = document.createElement('div');
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
  });

  describe('general', () => {
    it('should scroll 30px to the right', () => {
      render(<TestComponent />, root);

      const container = root.firstChild;

      expect(container.scrollLeft).to.equal(0);

      Simulate.mouseDown(container, {
        clientX: 100,
        clientY: 100,
      });

      window.dispatchEvent(new MouseEvent('mousemove', {
        clientX: 50,
        clientY: 100,
      }));

      window.dispatchEvent(new MouseEvent('mouseup', {
        clientX: 50,
        clientY: 100,
      }));

      expect(container.scrollLeft).to.equal(50);
    });
  });
});
