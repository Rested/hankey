import React from 'react';
import {
    connect
} from 'react-redux';
import {
    Grid,
    GridColumn,
    GridRow,
    Rating
} from 'semantic-ui-react';
import {
    LEVEL_BREAKPOINTS,
    MAX_SCHEDULE
} from '../constants';
import {
    mappedKeyboard
} from '../core/keys';
import Key from './Key';

const getNextLevel = progress => {
    const levelKeys = Object.keys(LEVEL_BREAKPOINTS).sort();
    const level = levelKeys.find(level => LEVEL_BREAKPOINTS[level] > progress)
    console.log('level', level);
    if (!level){
        return parseInt(levelKeys[levelKeys.length-1])
    }
    return parseInt(level);
}

function ProgressKeyboard({
    timeTillNextPractise
}) {
    return (<Grid container columns={16}>
        {mappedKeyboard.map((row, rowIndex) => (
            <GridRow centered key={`keyboarRow${rowIndex}`} relaxed>
                {row.map(({english, korean, koreanSecondary}) => {
                    let progress;
                    const primaryNextPractise = timeTillNextPractise.find(({character}) => character === korean).nextPractise 
                    if (koreanSecondary){
                        const secondaryNextPractise = timeTillNextPractise.find(({character}) => character === koreanSecondary).nextPractise 
                        progress = Math.min(MAX_SCHEDULE, parseInt(Math.round((primaryNextPractise + secondaryNextPractise)/2)))
                    }else{
                        progress = Math.min(MAX_SCHEDULE, primaryNextPractise);
                    }
                    const nextLevel = getNextLevel(progress)

                    return (<GridColumn key={english} style={{paddingLeft: '0.1rem', paddingRight: '0.1rem'}} textAlign='center'>
                        <Rating icon='star' size='mini' disabled rating={nextLevel} maxRating={Object.keys(LEVEL_BREAKPOINTS).length-1} />
                        <Key english={english} progress={progress} level={nextLevel} korean={korean} koreanSecondary={koreanSecondary} style={{marginTop: 0}}/></GridColumn>)})}
            </GridRow>)
        )}
    </Grid>)
}

const mapStateToProps = state => {
    const timeTillNextPractise = state.keyState.map(k => {
        return {
            character: k.character,
            nextPractise: k.lastSchedule - parseInt(((new Date()).getTime() - (k.pressedDate || new Date()).getTime()) / (1000 * 3600 * 24))
        }
    })
    return {
        timeTillNextPractise,
    }
}

export default connect(mapStateToProps)(ProgressKeyboard);