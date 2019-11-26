import React, {
    useEffect,
    useState
} from 'react';
import {
    connect
} from 'react-redux';
import {
    Grid,
    GridColumn,
    GridRow
} from 'semantic-ui-react';
import {
    ignoreInputs,
    pressKey
} from '../actions/hankey';
import {
    usePrevious
} from '../core/hooks';
import {
    mappedKeyboard
} from '../core/keys';
import Key from './Key';
import { playSound } from '../core/sounds';

const incorrectKeyStyle = {
    color: 'red',
    backgroundColor: 'lightpink',
    borderColor: 'red',
    opacity: 0.8
}

const removedKeyStyle = {
    color: 'gray',
    backgroundColor: 'lightgray',
    borderColor: 'gray',
    opacity: 0.8
}
const nearMissStyle = {
    color: 'orange',
    backgroundColor: 'yellow',
    borderColor: 'orange',
    opacity: 0.8
}

const pressedStyle = {
    color: 'green',
    backgroundColor: 'lightgreen',
    borderColor: 'green',
    animation: 'flash linear 1s infinite'
}


function Keyboard({
    removedKeys,
    targetCharacter,
    failures,
    onPress,
    ignoreInput
}) {
    const [animating, setAnimating] = useState(false)
    useEffect(() => {
        window.addEventListener("keypress", onPress)
        return () => {
            window.removeEventListener("keypress", onPress)
        }
    })
    const previousTargetCharacter = usePrevious(targetCharacter);
    useEffect(() => {
        console.log('using effect');
        if (previousTargetCharacter && targetCharacter && previousTargetCharacter !== targetCharacter) {
            setAnimating(previousTargetCharacter);
            ignoreInput(true);
            playSound(previousTargetCharacter);
            setTimeout(() => {
                ignoreInput(false);
                setAnimating(false);
            }, 1000)
        }

    }, [targetCharacter, ignoreInput, previousTargetCharacter])

    return (<Grid container>
        {mappedKeyboard.map((row, rowIndex) => (
            <GridRow centered key={`keyboarRow${rowIndex}`}>
                {row.map(({english, korean, koreanSecondary}) => {
                    let style = {};
                    const isTargetKey = (korean === targetCharacter || koreanSecondary === targetCharacter);
                    let reveal = false;
                    if (removedKeys.includes(korean) || removedKeys.includes(koreanSecondary)){
                        style = removedKeyStyle;
                        reveal = true;
                    } 
                    if (failures.includes(koreanSecondary) || failures.includes(korean)){
                        if (isTargetKey){
                            style = nearMissStyle;
                            reveal = false;
                        }  else {
                            style = incorrectKeyStyle;
                        }
                    }
                    if (animating && (korean === animating || koreanSecondary === animating)){
                        style = pressedStyle;
                        reveal = true;
                    } 
                    return (<GridColumn key={english} style={{paddingLeft: '0.1rem', paddingRight: '0.1rem'}}>
                        <Key english={english} style={style} korean={reveal ? korean : ''} koreanSecondary={reveal ? koreanSecondary : ''}/></GridColumn>)})}
            </GridRow>)
        )}
    </Grid>)
}

Keyboard.defaultProps = {
    removedKeys: [],
    failures: []
}

const mapStateToProps = state => ({
    removedKeys: state.disabledKeys,
    failures: state.keypresses,
    targetCharacter: state.targetCharacter
});
const mapDispatchToProps = dispatch => {
    return {
        onPress: (event) => {
            dispatch(pressKey(event.key))
        },
        ignoreInput: (yayOrNay) => {
            dispatch(ignoreInputs(yayOrNay))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)