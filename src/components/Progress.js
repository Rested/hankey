import React from 'react';
import {Grid, GridRow, GridColumn} from 'semantic-ui-react';
import ProgressKeyboard from './ProgressKeyboard';

export default function Progress(){
    return (
        <Grid centered>
        <GridRow>
          <GridColumn textAlign='center'>
            <p>Progress and levels</p>
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