import React from 'react';
import {
    Segment, Header, List
} from 'semantic-ui-react';


export default function About() {
    return (
        <Segment.Group>
            <Segment textAlign='left'>
                <Header as='h5'>HanKey is a little web app for learning the 2-set Korean keyboard layout created by Reuben Thomas-Davis. You can find it on github <a href='https://github.com/Rested/hankey'>here</a>.</Header>
            </Segment>
            <Segment textAlign='left'>
                <p> 
                    It features a keys section for learning where the keys are and a words section for
                    practicing typing full words once you get an understanding of which characters are where.
                </p>
                <p>
                    HanKey helps you track your progress and improve as quickly as possible by using the{' '}
                    <a href="https://www.supermemo.com/en/archives1990-2015/english/ol/sm2">supermemo2</a> spaced repetition
                    algorithm to determine which letter to practise next. This and various other progress metrics are exposed for the user to see.
                </p>
            </Segment>
            <Segment textAlign='left'>
                <p>Hankey is a <a href="https://reactjs.org/">React</a>/<a href="https://redux.js.org/">Redux</a> <a href="https://developers.google.com/web/progressive-web-apps">progressive web app</a>. Other tech used includes:</p>
                <List bulleted>
                    <List.Item>The fantastic <a href="https://github.com/e-/Hangul.js/">Hangul-js</a> package for disassembling and reassembling Hangul (Korean) characters - e.g. (한 &lt;-&gt; ㅎㅏㄴ). </List.Item>
                    <List.Item>The UI is built with <a href="https://react.semantic-ui.com/">semantic-ui-react</a>. </List.Item>
                    <List.Item>The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API">Web Speech Api</a> is used for Text-to-Speach synthesis</List.Item>
                    <List.Item><a href=".github/workflows/docker-package.yml">Github actions</a> for building the docker image and publishing to github&#39;s container registry on releases.</List.Item>
                    <List.Item><a href="https://github.com/zeit/serve#readme">Serve</a> for running the docker image.</List.Item>
                    <List.Item>Kubernetes for deployment</List.Item>
                    <List.Item><a href="https://www.ibm.com/watson/services/language-translator/">IBM&#39;s translate api</a> for translations of vocabulary (much more accurate than google or bing for korean words)</List.Item>
                    <List.Item><a href="http://konlpy.org/en/latest/">KoNLPy</a> for its corpuses and determining character frequency.</List.Item>
                </List>  
            </Segment>
        </Segment.Group>
    )
}