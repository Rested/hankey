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
    pressKey
} from '../actions/hankey';
import {
    MODE_GAME
} from '../constants';
import {
    usePrevious,
    useSpeechSynthesis
} from '../core/hooks';
import {
    mappedKeyboard
} from '../core/keys';
import {
    soundMapping
} from '../core/sounds';
import Key from './Key';

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
    onPress
}) {
    const [animating, setAnimating] = useState(false);
    const [
        ignoreInputs, setIgnoreInput
    ] = useState(false);
    const {
        speak,
        savedUtterance
    } = useSpeechSynthesis({
        onEnd: (wasCancelled) => {
            if (!wasCancelled) {
                console.log('trying to change stuff here')
                setIgnoreInput(false);
                setAnimating(false);
            }
        }
    });
    useEffect(() => {
        const onPressNoIgnore = (event) => {
            console.log(ignoreInputs);
            if (ignoreInputs) return;
            console.log('on press triggered')

            return onPress(event);
        }
        console.log('adding keypress listener');
        window.addEventListener("keypress", onPressNoIgnore);
        return () => {
            window.removeEventListener("keypress", onPressNoIgnore)
        }
    }, [ignoreInputs, onPress]);

    const previousTargetCharacter = usePrevious(targetCharacter);
    useEffect(() => {
        console.log('using effect');
        if (previousTargetCharacter && targetCharacter && previousTargetCharacter !== targetCharacter) {
            setAnimating(previousTargetCharacter);
            setIgnoreInput(true);
            speak({
                text: soundMapping[previousTargetCharacter],
                lang: 'ko-KR',
                rate: 0.6
            });
        }
    }, [targetCharacter, setIgnoreInput, previousTargetCharacter, speak])
    useEffect(() => {
        return () => {
            console.log('unmount');
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (savedUtterance && savedUtterance.current){
                savedUtterance.current.onend = null;

            }
        }
    }, []);

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
    removedKeys: state.keys.disabledKeys,
    failures: state.keys.keypresses,
    targetCharacter: state.keys.targetCharacter
});
const mapDispatchToProps = dispatch => {
    return {
        onPress: (event) => {
            console.log('on press triggered')

            dispatch(pressKey(event.key, MODE_GAME))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)