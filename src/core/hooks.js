import {
    useEffect,
    useRef,
    useState
} from 'react';


export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}


export const useSpeechSynthesis = (props = {}) => {
    const {
        onEnd = () => {}
    } = props;
    const [voices, setVoices] = useState([]);
    const [speaking, setSpeaking] = useState(false);
    const [currentUtterance, setCurrentUtterance] = useState(null);
    const supported = !!window.speechSynthesis;

    const savedCallback = useRef(onEnd);
    console.log('saved utterance set as', currentUtterance);
    console.log('window utterance is', window.utterance);
    const savedUtterance = useRef(currentUtterance || {});
     // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = onEnd;
    }, [onEnd]);
    useEffect(()=> {
        savedUtterance.current = currentUtterance;
    }, [currentUtterance]);

    const handleEnd = () => {
        savedCallback.current(speaking);
        setSpeaking(false);
    };


    const processVoices = (voiceOptions) => {
        setVoices(voiceOptions);
    };

    const getVoices = () => {
        // Firefox seems to have voices upfront and never calls the
        // voiceschanged event
        let voiceOptions = window.speechSynthesis.getVoices();
        if (voiceOptions.length > 0) {
            processVoices(voiceOptions);
            return;
        }

        window.speechSynthesis.onvoiceschanged = (event) => {
            voiceOptions = event.target.getVoices();
            processVoices(voiceOptions);
        };
    };
    console.log(currentUtterance);



    useEffect(() => {
        if (supported) {
            getVoices();
        }
    }, []);


    const speak = (args = {}) => {
        const {
            voice = null, text = '', lang = null, rate = 1, pitch = 1,
        } = args;
        setSpeaking(true);
        // Firefox won't repeat an utterance that has been
        // spoken, so we need to create a new instance each time
        const utterance = new window.SpeechSynthesisUtterance();
        utterance.text = text;
        if (voice) utterance.voice = voice;
        utterance.onend = handleEnd;
        if (lang) utterance.lang = lang;
        utterance.rate = rate;
        utterance.pitch = pitch;
        setCurrentUtterance(utterance);
        window.speechSynthesis.speak(utterance);
    };

    const cancel = () => {
        setSpeaking(false);
        window.speechSynthesis.cancel();
    };

    return {
        supported,
        speak,
        speaking,
        cancel,
        voices,
        savedUtterance,
        handleEnd
    };
};