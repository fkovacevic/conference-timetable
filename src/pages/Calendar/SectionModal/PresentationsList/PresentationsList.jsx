import React from 'react';
import moment from 'moment';
import { Collapse, Row, Col } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons'


import apiPath from '../../../../constants/api/apiPath';
import Author from './Author';
import './_presentations-list.scss';


const { Panel } = Collapse;



function presentationsMapper(presentation) {
    const presentationStart = this.presentationTime.format('LT');
    const durationText = ` [${presentation.durationMinutes} minutes]`;
    const presentationTitle = `${presentation.title} - ${presentationStart} ${durationText}`;
    this.presentationTime.add(presentation.durationMinutes, 'minutes');

    return (
        <Panel header={presentationTitle} key={presentation.id}>
            <Row >
                <Col sm={6}>
                    <b>• Authors:</b>
                </Col>
                <Col sm={18}>
                    {presentation.authors.map((author, index) => (
                        <Row>
                            <Author authorName={author} hasPicture={index === 0 && presentation.hasPhoto} presentationId={presentation.id}/>
                        </Row>)
                    )}
                </Col>
            </Row>
            <Row className="presentations-list__description" sm={12}>
                    <Col sm={6}>
                        <b>• Description:</b>
                    </Col>
                    <Col sm={18}>{presentation.description}</Col>
            </Row>
            {presentation.attachmentFileName && (
                <Row className="presentations-list__attachment">
                        <div className="presentations-list__attachment__card">
                            <a href={`${apiPath}/presentations/${presentation.id}/attachments`} download>Download {presentation.attachmentFileName}</a>
                            <CloudDownloadOutlined className='presentations-list__attachment__card__icon'/>
                        </div>
                </Row>
            )}
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