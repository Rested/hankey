import React from 'react';
import './App.css';
import { Container, Header } from 'semantic-ui-react';
import TargetCharacter from './components/TargetCharacter';

function App() {
  return (
    <Container className='App'>
      <Header sub>Hankey</Header>
      <span>Learn 2 set Hangul keyboard</span>
      <Container>
          <TargetCharacter></TargetCharacter>
      </Container>
    </Container>
  );
}

export default App;
