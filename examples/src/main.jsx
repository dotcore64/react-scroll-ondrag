import React, { useRef } from 'react';
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
  height: 100%;
  margin: 5px 10px;
  width: 250px;
  background-color: #F00;
`;

const App = () => {
  const containerRef = useRef(null);
  const { events } = useScrollOnDrag(containerRef);

  return (
    <Container {...events} ref={containerRef}>
      {[...Array(30).keys()].map(i => <Box key={i} />)}
    </Container>
  );
};

render(
  <App />,
  document.getElementById('demo'),
);
