import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Header, Grid, GridRow, GridColumn, Divider } from 'semantic-ui-react';
import TargetCharacter from './components/TargetCharacter';
import Keyboard from './components/Keyboard';
import {Provider} from 'react-redux';
import hankeyStore from './stores/hankey';
import Menu from './components/Menu';

function App() {

  return (
    <Provider store={hankeyStore}>
      <Container className='App'>
        <Header as='h1'>Hankey</Header>
        <Header as='h3' style={{marginTop: 0}}>Learn 2 set Hangul keyboard</Header>
        <Divider/>
        <Menu/>
      </Container>
    </Provider>
    
  );
}

export default App;
