import { allKoreanCharacters } from "./keys"
import Hangul from 'hangul-js';

export const soundMapping = (()=> {
    const mapping = {};
    allKoreanCharacters.forEach(char => {
        if (char === 'ㅇ'){
            mapping['ㅇ'] = '이응'
        }else{
            mapping[char] = Hangul.isVowel(char) ? Hangul.assemble(['ㅇ', char]) : Hangul.assemble([char, 'ㅡ']);
        }
    })
    return mapping;
})() 

export function playSound(character, onEndCallback){
    const utterance = new SpeechSynthesisUtterance(soundMapping[character]);
    utterance.lang = 'ko-KR'
    utterance.rate = 0.6
    utterance.onend = onEndCallback;
    speechSynthesis.speak(utterance)
    
}