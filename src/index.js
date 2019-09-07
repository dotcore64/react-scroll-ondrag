import { useEffect, useRef, useCallback } from 'react';
import invariant from 'tiny-invariant';

const maxHorizontalScroll = dom => dom.scrollWidth - dom.clientWidth;
const maxVerticalScroll = dom => dom.scrollHeight - dom.clientHeight;

export default (domRef, {
  onDragStart = () => {},
  onDragEnd = () => {},
  runScroll = ({ dx, dy }) => {
    const offsetX = Math.min(maxHorizontalScroll(domRef.current), domRef.current.scrollLeft + dx);
    domRef.current.scrollLeft = offsetX; // eslint-disable-line no-param-reassign

    const offsetY = Math.min(maxVerticalScroll(domRef.current), domRef.current.scrollTop + dy);
    domRef.current.scrollTop = offsetY; // eslint-disable-line no-param-reassign
  },
} = {}) => {
  const internalState = useRef({
    lastMouseX: null,
    lastMouseY: null,
    isMouseDown: false,
    isScrolling: false,
  });

  const scroll = useCallback(({ dx, dy }) => {
    invariant(domRef.current !== null, `Trying to scroll to the bottom, but no element was found.
      Did you call this scrollBottom before the component with this hook finished mounting?`);

    runScroll({ dx, dy });
  }, [runScroll]);

  const onMouseDown = useCallback((e) => {
    internalState.current.isMouseDown = true;
    internalState.current.lastMouseX = e.clientX;
    internalState.current.lastMouseY = e.clientY;
  }, []);

  const onMouseUp = () => {
    internalState.current.isMouseDown = false;
    internalState.current.lastMouseX = null;
    internalState.current.lastMouseY = null;

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
    const dx = -(e.clientX - internalState.current.lastMouseX);
    const dy = -(e.clientY - internalState.current.lastMouseY);
    internalState.current.lastMouseX = e.clientX;
    internalState.current.lastMouseY = e.clientY;

    scroll({ dx, dy });
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
