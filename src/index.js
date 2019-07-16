import { useEffect, useRef, useCallback } from 'react';
import invariant from 'tiny-invariant';

const maxHorizontalScroll = dom => dom.scrollWidth - dom.clientWidth;

export default (domRef, {
  // eslint-disable-next-line no-param-reassign
  runScroll = (offset) => { domRef.current.scrollLeft = offset; },
  onDragStart = () => {},
  onDragEnd = () => {},
} = {}) => {
  const internalState = useRef({
    lastMousePosition: null,
    isMouseDown: false,
    isScrolling: false,
  });

  const scroll = useCallback((position) => {
    invariant(domRef.current !== null, `Trying to scroll to the bottom, but no element was found.
      Did you call this scrollBottom before the component with this hook finished mounting?`);

    const offset = Math.min(maxHorizontalScroll(domRef.current), position);
    runScroll(offset);
  }, [runScroll]);

  const onMouseDown = useCallback((e) => {
    internalState.current.isMouseDown = true;
    internalState.current.lastMousePosition = e.clientX;
  }, []);

  const onMouseUp = () => {
    internalState.current.isMouseDown = false;
    internalState.current.lastMousePosition = null;

    if (internalState.current.isScrolling) {
      internalState.current.isScrolling = false;
      onDragEnd();
    }
  };

  const onMouseMove = (e) => {
    if (!internalState.current.isMouseDown) {
      return;
    }

    if (!internalState.current.isScrolling) {
      internalState.current.isScrolling = true;
      onDragStart();
    }

    // diff is negative because we want to scroll in the opposite direction of the movement
    const diff = -(e.clientX - internalState.current.lastMousePosition);
    internalState.current.lastMousePosition = e.clientX;

    scroll(domRef.current.scrollLeft + diff);
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return {
    events: {
      onMouseDown,
    },
  };
};
