import React, { useState } from 'react';

import { Modal } from 'antd';
import PresentationsList from './PresentationsList';

const fetchedSectionMock = {
    "id": 1,
    "eventId": 1,
    "locationId": 1,
    "title": "Section A",
    "chairs": [
      "Chair AA",
      "Chair AB"
    ],
    "startAt": "2021-11-07T14:07:53.750793+00:00",
    "endAt": "2021-11-07T18:07:53.750793+00:00",
    "backgroundColor": 2156287,
    "presentations": [
      {
        "id": 1,
        "title": "Presentation AA",
        "authors": [
          "Author AAA",
          "Author AAB"
        ],
        "description": "Description",
        "position": 1,
        "durationMinutes": 60,
        "attachment": null,
        "mainAuthorPhoto": null
      },
      {
        "id": 2,
        "title": "Presentation AB",
        "authors": [
          "Author ABA",
          "Author ABB"
        ],
        "description": "Description",
        "position": 2,
        "durationMinutes": 60,
        "attachment": null,
        "mainAuthorPhoto": null
      },
      {
        "id": 3,
        "title": "Presentation ABC",
        "authors": [
          "Author ABA",
          "Author ABB"
        ],
        "description": "Description",
        "position": 2,
        "durationMinutes": 60,
        "attachment": null,
        "mainAuthorPhoto": null
      },
      {
        "id": 4,
        "title": "Presentation ABCD",
        "authors": [
          "Author ABA",
          "Author ABB"
        ],
        "description": "Description",
        "position": 2,
        "durationMinutes": 90,
        "attachment": null,
        "mainAuthorPhoto": null
      },
      {
        "id": 5,
        "title": "Presentation ABCDF",
        "authors": [
          "Author ABA",
          "Author ABB"
        ],
        "description": "Description",
        "position": 2,
        "durationMinutes": 90,
        "attachment": null,
        "mainAuthorPhoto": null
      },
    ]
  };


const SectionModal = ({ visible, setVisibility, sectionInfo }) => {
    const { title, start } = sectionInfo;

    const onClose = () => setVisibility(false);

    return (
        <Modal
            visible={visible}
            title={title}
            onCancel={onClose}
        >
            <PresentationsList
                presentations={fetchedSectionMock.presentations}
                sectionStart={start}
            />
        </Modal>
    );
}

export default SectionModal;
