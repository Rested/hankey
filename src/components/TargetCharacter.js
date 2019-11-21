import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

export default function TargetCharacter({character}) {
    return (<Segment className='target-character'>
        <Header>{character}</Header>
    </Segment>)
}