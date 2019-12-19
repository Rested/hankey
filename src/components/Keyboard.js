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



function Keyboard({
    removedKeys,
    targetCharacter,
    failures,
    onPress,
    muted,
}) {
    const [animating, setAnimating] = useState(false);
    const [
        ignoreInputs, setIgnoreInput
    ] = useState(false);
    const {
        speak,
        savedUtterance,
        cancel
    } = useSpeechSynthesis({
        onEnd: (wasCancelled) => {
            if (!wasCancelled) {
                setAnimating(false);
            }
        }
    });
    const previousTargetCharacter = usePrevious(targetCharacter);

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

    useEffect(() => {
        console.log('using effect');
        if (previousTargetCharacter && targetCharacter && previousTargetCharacter !== targetCharacter) {
            setAnimating(previousTargetCharacter);
            cancel();
            speak({
                text: soundMapping[previousTargetCharacter],
                lang: 'ko-KR',
                rate: 0.6,
                volume: muted ? 0 : 100,
            });
            
        }
    }, [targetCharacter, previousTargetCharacter, speak, muted]);
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
                    let keyClass = '';
                    const isTargetKey = (korean === targetCharacter || koreanSecondary === targetCharacter);
                    let reveal = false;
                    if (removedKeys.includes(korean) || removedKeys.includes(koreanSecondary)){
                        reveal = true;
                        keyClass = 'inactive';
                    } 
                    if (failures.includes(koreanSecondary) || failures.includes(korean)){
                        if (isTargetKey){
                            reveal = false;
                            keyClass = 'near-miss';
                        }  else {
                            keyClass = 'error';
                        }
                    }
                    if (animating && (korean === animating || koreanSecondary === animating)){
                        keyClass = 'pressed';
                        reveal = true;
                    } 
                    return (<GridColumn key={english} style={{paddingLeft: '0.1rem', paddingRight: '0.1rem'}}>
                        <Key english={english} className={keyClass} korean={reveal ? korean : ''} koreanSecondary={reveal ? koreanSecondary : ''}/></GridColumn>)})}
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
    targetCharacter: state.keys.targetCharacter,
    muted: state.base.muted,
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