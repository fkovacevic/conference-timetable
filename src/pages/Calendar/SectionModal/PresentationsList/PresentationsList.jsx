import React from 'react';

import moment from 'moment';

import { Collapse, Row, Col } from 'antd';

import './_presentations-list.scss';


const { Panel } = Collapse;


const presentationsMapper = function(presentation) {
    const presentationStart = this.presentationTime.format('LT');
    const presentationTitle = `${presentation.title} - ${presentationStart}`;
    this.presentationTime.add(presentation.durationMinutes, 'minutes');
    const durationText = `• Duration: ${presentation.durationMinutes} minutes`;

    return (
        <Panel header={presentationTitle} key={presentation.id}>
            <Row>
                <Col className="presentations-list__left-element" sm={12}>
                    <Row >
                        <Col sm={12}>• Authors</Col>
                        <Col sm={12}>
                            {presentation.authors.map((author) =><Row>{author}</Row>)}
                        </Col>
                    </Row>
                    <Row className="presentations-list__duration">
                        {durationText}
                    </Row>
                </Col>
                <Col className="presentations-list__description" sm={12}>
                    <Row className="presentations-list__description__title">Description:</Row>
                    <Row className="presentations-list__description__text">{presentation.description}</Row>
                </Col>
            </Row>
         </Panel>
    );
}

const PresentationsList = ({ presentations, sectionStart }) => {
    return (
        <Collapse expandIconPosition='right'>
            {presentations.map(presentationsMapper, { presentationTime:  moment(sectionStart, "hh:mm:ss A")} )}
        </Collapse>
    );
}

export default PresentationsList;