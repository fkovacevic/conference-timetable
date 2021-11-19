import React, { useState } from 'react'
import moment from 'moment';
import { Calendar as ReactCalendar, momentLocalizer } from 'react-big-calendar'

import { sectionsInfoToCalendarEvents } from './helper';

import SectionModal from './SectionModal/SectionModal'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './_calendar.scss';

const localizer = momentLocalizer(moment);

const fetchedConferenceMock = {
    "id": 1,
    "title": "Event A",
    "description": "Event A Description",
    "startAt": "2021-11-11T18:59:06.311058+00:00",
    "endAt": "2021-11-16T18:59:06.311058+00:00",
    "sections": [
      {
        "id": 1,
        "locationId": 1,
        "locationName": 'D3',
        "title": "Section A",
        "chairs": [
          "Chair AA",
          "Chair AB"
        ],
        "startAt": "2021-11-18T16:00:00.311058+00:00",
        "endAt": "2021-11-18T22:00:00.311058+00:00",
        "backgroundColor": 2156287
      },
      {
        "id": 2,
        "locationId": 2,
        "locationName": 'D2',
        "title": "Section B",
        "chairs": [
          "Chair BA",
          "Chair BB"
        ],
        "startAt": "2021-11-18T18:59:06.311058+00:00",
        "endAt": "2021-11-18T19:59:06.311058+00:00",
        "backgroundColor": 10514929
      }
    ]
  };

const mockEvents = sectionsInfoToCalendarEvents(fetchedConferenceMock.sections);


const Calendar = () => {
    const [isModalVisible,showEventModal] = useState(false);
    const [openedSectionInfo, setOpenedSectionInfo] = useState({});
    const onSelectEvent = (event) => {
        showEventModal(true);
        setOpenedSectionInfo(event);
    }

    return (
        <div className="calendar">
            <ReactCalendar
                localizer={localizer}
                events={mockEvents}
                defaultView='week'
                onSelectEvent={onSelectEvent}
                views={['week', 'day']}
            />
            <SectionModal
                visible={isModalVisible}
                setVisibility={showEventModal}
                sectionInfo={openedSectionInfo}
            />
        </div>
    )
}

export default Calendar;
