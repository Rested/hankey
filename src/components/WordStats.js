import React from 'react';
import {
    Statistic,
    Grid,
    Header,
    Segment,
    GridRow,
    Icon,
    GridColumn,
    Container,
} from 'semantic-ui-react';
import {
    connect
} from 'react-redux';
import {
    disassemble
} from 'hangul-js';

function WordStats({
    streak,
    bestStreak,
    timePerWord,
    recentTimePerWord,
    errorsPerWord,
    recentErrorsPerWord,
    totalWords,
    totalCharLength,
}) {
    return (
        <Segment.Group horizontal>
            <Segment>
                <Container>
                    <Statistic.Group widths={2} size='small'>
                        <Statistic horizontal>
                            <Statistic.Value>{totalCharLength}</Statistic.Value>
                            <Statistic.Label>Letters</Statistic.Label>
                        </Statistic>
                        <Statistic horizontal>
                            <Statistic.Value>{totalWords}</Statistic.Value>
                            <Statistic.Label>Words</Statistic.Label>
                        </Statistic>
                        <Statistic horizontal>
                            <Statistic.Value>{streak} <Icon name='fire' color='orange'/></Statistic.Value>
                        </Statistic>
                        <Statistic horizontal>
                            <Statistic.Value>{bestStreak} <Icon name='fire' color='red'/></Statistic.Value>
                        </Statistic>
                    </Statistic.Group>
                </Container>
            </Segment>
            <Segment>
                <Container>
                    <Header>Recent</Header>
                    <Statistic.Group widths={2} size='small'>
                        <Statistic>
                            <Statistic.Value>{recentTimePerWord}s</Statistic.Value>
                            <Statistic.Label>Time per word</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{recentErrorsPerWord}</Statistic.Value>
                            <Statistic.Label>Errors per word</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Container>
            </Segment>
            <Segment>
                <Container>
                    <Header>All Time</Header>
                    <Statistic.Group widths={2} size='small'>
                        <Statistic>
                            <Statistic.Value>{timePerWord}s</Statistic.Value>
                            <Statistic.Label>Time per word</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{errorsPerWord}</Statistic.Value>
                            <Statistic.Label>Errors per word</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Container>
            </Segment>
        </Segment.Group>
    )
}

const getSeconds = (a, b) => {
    console.log(a, b);
    const val = ((new Date(a)).getTime() - (new Date(b)).getTime()) / 1000;
    return Math.min(val, 60);
}
const mapStateToProps = state => {
    const totalLength = state.words.history.length;
    const historic = state.words.history.reduce((acc, wordHistory, i) => {
        const timeTaken = getSeconds(wordHistory.endDateTime, wordHistory.startDateTime);
        acc.timePerWord += timeTaken;
        const errorLength = wordHistory.errors.length;
        acc.errorsPerWord += errorLength;
        acc.totalCharLength += disassemble(wordHistory.word).length
        console.log(timeTaken);
        if (i >= totalLength - 11) {
            console.log(i, totalLength);
            acc.recentTimePerWord += timeTaken;
            acc.recentErrorsPerWord += errorLength;
        }
        if (i === totalLength - 1) {
            console.log(acc.timePerWord);
            console.log(acc.recentTimePerWord);
            acc.timePerWord = (acc.timePerWord / totalLength).toFixed(2);
            acc.recentTimePerWord = (acc.recentTimePerWord / Math.min(totalLength, 10)).toFixed(2);
            acc.errorsPerWord = (acc.errorsPerWord / totalLength).toFixed(2);
            acc.recentErrorsPerWord = (acc.recentErrorsPerWord / Math.min(totalLength, 10)).toFixed(2);
        }
        return acc;
    }, {
        timePerWord: 0,
        recentTimePerWord: 0,
        errorsPerWord: 0,
        recentErrorsPerWord: 0,
        totalCharLength: 0,
    });
    console.log(historic);
    return {
        ...historic,
        streak: state.words.streak,
        bestStreak: state.words.bestStreak,
        totalWords: totalLength,
    }
}

export default connect(mapStateToProps)(WordStats);