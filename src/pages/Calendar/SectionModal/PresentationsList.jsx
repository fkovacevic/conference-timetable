import React from 'react';
import moment from 'moment';
import { Collapse } from 'antd';

import { getPresentationTitle } from '../helper'

const { Panel } = Collapse;


const presentationsMapper = function(presentation) {
    const presentationStart = this.presentationTime.format('LT');
    const presentationTitle = `${presentation.title} - ${presentationStart}`;
    this.presentationTime.add(presentation.durationMinutes, 'minutes');

   return <Panel header={presentationTitle} key={presentation.id} >
        <p>
            {presentation.description}
        </p>
    </Panel>
}

const PresentationsList = ({ presentations, sectionStart }) => {
    console.log(moment(sectionStart, "hh:mm:ss A")
    .add(30, 'minutes')
    .format('LTS'))
    return (
        <Collapse expandIconPosition='right'>
            {presentations.map(presentationsMapper, { presentationTime:  moment(sectionStart, "hh:mm:ss A")} )}
  </Collapse>
    );
}

export default PresentationsList;