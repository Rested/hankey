import React from 'react';
import {
    connect
} from 'react-redux';
import {
    isSecondary
} from '../core/keys';
import Key from './Key';

function TargetCharacter({
    character
}) {
    return (
        <Key
            style={{fontSize:25}}
            compact
            korean={isSecondary(character) || character}
            koreanSecondary={isSecondary(character) && character}
        />
    )
}

const mapStateToProps = state => ({
    character: state.targetCharacter,
})

export default connect(mapStateToProps)(TargetCharacter)