import React, {useEffect, useState} from 'react';
import { Container, Segment, Header, Statistic, Icon, Input } from 'semantic-ui-react';
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

function Words({onPress, currentWord, currentWordRemaining, currentWordErrors, currentWordProgress}){
    const {
        speak,
    } = useSpeechSynthesis();

    useEffect(()=> {
        speak({
            text: currentWord,
            lang: 'ko-KR',
            rate: 0.6
        })
    }, [currentWord]);

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
        <Segment fluid>
            <Header as="h1">
                <span style={{color: 'green'}}>{reducedLetters.green}</span>
                <span style={{color: 'blue'}}>{reducedLetters.blue}</span>
                <span>{reducedLetters.black}</span>
            </Header>
        </Segment>
        <Segment>
            <Header as="h2" color="red">{currentWordErrors}</Header>
        </Segment>
        <Segment>
            <WordStats/>
        </Segment>
    </Container>
    );
} 

const mapStateToProps = state => {
    const disProg = disassemble(state.words.currentWordProgress);
    return {
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