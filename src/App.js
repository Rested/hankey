import React from 'react';
import {
    Provider
} from 'react-redux';
import {
    Container,
    Divider,
    Header
} from 'semantic-ui-react';
import './App.css';
import Menu from './components/Menu';
import hankeyStore from './stores/hankey';

function App() {

    return (
        <Provider store={hankeyStore}>
          <Container className='App'>
            <Header as='h1' color='yellow'>HanKey</Header>
            <Header as='h3' color='white' style={{marginTop: 0}}>Learn 2-set Hangul keyboard</Header>
            <Divider/>
            <Menu/>
          </Container>
        </Provider>
    );
}

export default App;