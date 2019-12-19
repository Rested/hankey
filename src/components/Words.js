import React, {useEffect, useState} from 'react';
import { Container, Segment, Header, Statistic, Icon, Input, Label } from 'semantic-ui-react';
import WordStats from './WordStats';
import {connect} from 'react-redux';
import {
    pressKey
} from '../actions/hankey';
import {disassemble, assemble} from 'hangul-js';
import { MODE_WORDS } from '../constants';
import {
    useSpeechSynthesis
} from '../core/hooks';
import translations from '../core/translations';

function Words({onPress,muted, currentWord, currentWordRemaining, currentWordErrors, currentWordProgress}){
    const {
        speak,
    } = useSpeechSynthesis();


    useEffect(()=> {
        if(!muted){
            speak({
                text: currentWord,
                lang: 'ko-KR',
                rate: 0.6
            })
        }
        
    }, [currentWord, muted]);
    

    useEffect(() => {
        window.addEventListener("keypress", onPress);
        return () => {
            window.removeEventListener("keypress", onPress)
        }
    }, [onPress]);

    const letters = currentWord.split('');
    const curWordLen = disassemble(currentWordProgress).length
    const reducedLetters = letters.reduce((acc, cur, indx, arr) => {
        if (undefined === acc.lenBeforeWord) return acc;
        const currentLetter = disassemble(cur);
        console.log(acc);
        if (acc.lenBeforeWord + currentLetter.length > curWordLen){
            if (acc.lenBeforeWord === curWordLen){
                console.log('here', arr, indx, cur)
                return {
                    green: arr.slice(0, indx).join(''),
                    blue: '',
                    black: arr.slice(indx, arr.length).join('')
                }
            }
            console.log('here2', arr, indx, cur);
            return {
                green: arr.slice(0, indx).join(''),
                blue: cur,
                black: arr.slice(indx+1, arr.length).join('')
            }
        
        }
        return {
            ...acc,
            lenBeforeWord: currentLetter.length + acc.lenBeforeWord,
        }
        
    }, {
        lenBeforeWord: 0,
        green: '',
        blue: '',
        black: '',
    });
    // TODO: translation next to word
    
    return (
    <Container>
        <Segment.Group>
            <Segment.Group horizontal>
        <Segment>
            <Label color='blue' attached='bottom left' icon={{name: 'target', color:'white'}}></Label>
            <Header as="h1" style={{display: 'inline'}}>
                <span className='yellow'>{reducedLetters.green}</span>
                <span className='blue'>{reducedLetters.blue}</span>
                <span>{reducedLetters.black}</span>
            </Header>
        </Segment>
        <Segment>
            <Header as='h1'>
                {translations[currentWord]}
            </Header>
        </Segment>
        </Segment.Group>
        <Segment>
            <Label color='blue' attached='bottom left' icon={{name: 'keyboard', color:'yellow'}}></Label>
            <Header as="h1" style={{display: 'inline'}}>
                <span className='yellow'>{currentWordProgress || '\u00a0'}</span>
            </Header>
        </Segment>
        <Segment>
            <Label color='blue' attached='bottom left' icon={{name: 'keyboard', color:'red'}}></Label>
            <Header as="h2" color="red" style={{display: 'inline'}}>{currentWordErrors || '\u00a0'}</Header>
        </Segment>
        </Segment.Group>
        <WordStats/>
    </Container>
    );
} 

const mapStateToProps = state => {
    const disProg = disassemble(state.words.currentWordProgress);
    return {
        muted: state.base.muted,
        currentWord: state.words.currentWord,
        currentWordRemaining: assemble(disassemble(state.words.currentWord).filter((c, i) => 
            i >= disProg.length || disProg[i] !== c
        )),
        currentWordProgress: state.words.currentWordProgress,
        currentWordErrors: state.words.currentWordErrors.join(', '),
    }
}

const mapDispatchToProps = dispatch => ({
    onPress: (event) => {
        dispatch(pressKey(event.key, MODE_WORDS))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Words);