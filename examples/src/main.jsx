import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import useScrollOnDrag from 'react-scroll-ondrag';
import styled from 'styled-components';

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
  height: 300px;
  margin: 5px 10px;
  width: 250px;
  background-color: #F00;
`;

const ScrollableBox = ({ runScroll }) => {
  const containerRef = useRef(null);
  const { events } = useScrollOnDrag(containerRef, {
    runScroll: runScroll && runScroll(containerRef),
  });

  return (
    <Container {...events} ref={containerRef}>
      {[...Array(30).keys()].map(i => <Box key={i} />)}
    </Container>
  );
};

ScrollableBox.propTypes = {
  runScroll: PropTypes.func,
};

ScrollableBox.defaultProps = {
  runScroll: undefined,
};

const App = () => (
  <>
    <div>Default runScroll, scrolls both x and y directions:</div>
    <ScrollableBox />
    <div>Scrolls only x direction at 5 times the normal speed:</div>
    <ScrollableBox runScroll={containerRef => ({ dx }) => {
      containerRef.current.scrollLeft += dx * 5; // eslint-disable-line no-param-reassign
    }}
    />
  </>
);

render(
  <App />,
  document.getElementById('demo'),
);
