import React from 'react';
import {Grid, GridRow, GridColumn} from 'semantic-ui-react';
import ProgressKeyboard from './ProgressKeyboard';

export default function Progress(){
    return (
        <Grid centered>
        <GridRow>
          <GridColumn textAlign='center'>
            <span className='white'>Progress and levels</span>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <ProgressKeyboard/>
          </GridColumn>
        </GridRow>
      </Grid>
    )
}