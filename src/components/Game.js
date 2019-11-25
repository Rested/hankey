import React from 'react';
import {
    Grid,
    GridColumn,
    GridRow
} from 'semantic-ui-react';
import Keyboard from './Keyboard';
import TargetCharacter from './TargetCharacter';

export default function Game() {
    return (
        <Grid centered>
          <GridRow>
            <GridColumn width={2}>
              <TargetCharacter />
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <Keyboard/>
            </GridColumn>
          </GridRow>
        </Grid>
    )
}