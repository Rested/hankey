import {Container, Menu, MenuItem} from 'semantic-ui-react';
import React from 'react';
import {connect} from 'react-redux';
import { MODE_GAME, MODE_PROGRESS } from '../constants';
import Game from './Game';
import Progress from './Progress';
import { changeMode } from '../actions/hankey';

function ModeMenu({mode, setMode}){
    return (
        <Container>
            <Menu>
                <MenuItem name={MODE_GAME} active={MODE_GAME === mode} onClick={setMode}>{MODE_GAME}</MenuItem>
                <MenuItem name={MODE_PROGRESS} active={MODE_PROGRESS === mode} onClick={setMode}>{MODE_PROGRESS}</MenuItem>
            </Menu>
            {mode === MODE_GAME ? <Game/> : null}
            {mode === MODE_PROGRESS ? <Progress/> : null}
        </Container>
    )
}


const mapStateToProps = state => ({
    mode: state.mode,
})
const mapDispatchToProps = dispatch => ({
    setMode: (e, {name}) => {dispatch(changeMode(name))}
})

export default connect(mapStateToProps, mapDispatchToProps)(ModeMenu)
