import React from 'react';
import {Segment, Grid, GridRow, GridColumn} from 'semantic-ui-react';

export default function Key({english, korean, koreanAlt}) {
    return (
        <Segment className='key' rounded>
            <Grid>
                <GridRow>
                    <GridColumn>
                        {english}
                    </GridColumn>
                    <GridColumn>
                        {koreanAlt || ''}
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        {korean}
                    </GridColumn>
                </GridRow>
            </Grid>
        </Segment>
    )
}