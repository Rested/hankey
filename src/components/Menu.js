import {Container, Menu, MenuItem, Icon} from 'semantic-ui-react';
import React from 'react';
import {connect} from 'react-redux';
import { MODE_GAME, MODE_PROGRESS, MODE_WORDS, MODE_ABOUT } from '../constants';
import Game from './Game';
import Progress from './Progress';
import Words from './Words';
import About from './About';
import { changeMode, toggleMute } from '../actions/hankey';

function ModeMenu({mode, setMode, toggleMute, muted}){
    return (
        <Container>
            <Menu>
                <MenuItem name={MODE_GAME} active={MODE_GAME === mode} onClick={setMode}>{MODE_GAME}</MenuItem>
                <MenuItem name={MODE_PROGRESS} active={MODE_PROGRESS === mode} onClick={setMode}>{MODE_PROGRESS}</MenuItem>
                <MenuItem name={MODE_WORDS} active={MODE_WORDS === mode} onClick={setMode}>{MODE_WORDS}</MenuItem>
                <MenuItem name={MODE_ABOUT} active={MODE_ABOUT === mode} onClick={setMode}>{MODE_ABOUT}</MenuItem>
                <Menu.Menu position='right'>
                    <MenuItem name='mute' onClick={toggleMute}>
                        <Icon name={muted ? 'volume off' : 'volume up'}/>
                    </MenuItem>
                </Menu.Menu>
            </Menu>
            {mode === MODE_GAME ? <Game/> : null}
            {mode === MODE_PROGRESS ? <Progress/> : null}
            {mode === MODE_WORDS ? <Words/> : null}
            {mode === MODE_ABOUT ? <About/> : null}
        </Container>
    )
}


const mapStateToProps = state => ({
    mode: state.base.mode,
    muted: state.base.muted,
})
const mapDispatchToProps = dispatch => ({
    setMode: (e, {name}) => {dispatch(changeMode(name))},
    toggleMute: () => {dispatch(toggleMute())}
})

export default connect(mapStateToProps, mapDispatchToProps)(ModeMenu)
