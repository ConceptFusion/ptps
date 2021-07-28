import { FC, StrictMode } from 'react';
import { Container } from '@mantine/core';
import styled from 'styled-components';
import PartSearch from './components/PartSearch';

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 1rem 0;
`;
const H1 = styled.h1`
  font-weight: 300;
  margin-left: 1rem;
`;

export const App: FC = () => {
  return (
    <StrictMode>
      <Container>
        <Header>
          <img src='partstrader-logo.jpg' alt='PartsTrader' width='300px' />
          <H1>Parts Service</H1>
        </Header>

        <PartSearch />
      </Container>
    </StrictMode>
  );
};

export default App;
