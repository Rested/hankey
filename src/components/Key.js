import React from 'react';
import {
    Grid,
    GridColumn,
    GridRow,
    Segment
} from 'semantic-ui-react';
import {
    LEVEL_BREAKPOINTS
} from '../constants';


const baseProgressStyle = {
    position: 'absolute',
    backgroundColor: 'lightgreen',
    width: '100%',
    bottom: 0,
    marginLeft: '-1rem'
}
export default function Key(props) {
    const {
        english,
        korean,
        koreanSecondary,
        style,
        progress,
        level,
        ...otherProps
    } = props;

    return (
        <Segment columns={2} className='key' {...otherProps} style={style||{}}>
            {progress ? <div style={{height: `${((progress - LEVEL_BREAKPOINTS[level-1])/(LEVEL_BREAKPOINTS[level] - LEVEL_BREAKPOINTS[level-1]))*100}%`, ...baseProgressStyle}}/> : null}
            <Grid>
                <GridRow style={{paddingBottom: 0, paddingTop: '0.1rem'}} verticalAlign='top'>
                    <GridColumn textAlign='left' style={{paddingRight: '0.3rem', paddingLeft: '0.5rem'}}>
                        <span>{english || <span>&nbsp;</span>}</span>
                    </GridColumn>
                    <GridColumn textAlign='right' width={13}  style={{paddingRight: '0.3rem', paddingLeft: '0.3rem'}}>
                        <span>{koreanSecondary || <span>&nbsp;</span>}</span>
                    </GridColumn>
                </GridRow>
                <GridRow style={{paddingBottom: '0.1rem', paddingTop: 0}}>
                    <GridColumn width={16} textAlign='right' style={{paddingRight: '0.4rem', paddingLeft: '0.3rem'}}>
                        <span>{korean || <span>&nbsp;</span>}</span>
                    </GridColumn>
                </GridRow>
            </Grid>
        </Segment>
    )
}