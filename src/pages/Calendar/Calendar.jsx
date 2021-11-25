import React, { useState } from 'react'
import moment from 'moment';
import { Calendar as ReactCalendar, momentLocalizer } from 'react-big-calendar'
import { Input, Row, Col } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons'

import { sectionsInfoToCalendarEvents } from './helper';

import { numberToHexColor } from '../../common/common'

import SectionModal from './SectionModal/SectionModal'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './_calendar.scss';

const localizer = momentLocalizer(moment);

const { Search } = Input;

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
        "backgroundColor": 255
      },
	  {
        "id": 3,
        "locationId": 2,
        "locationName": 'D4',
        "title": "C section",
        "chairs": [
          "Chair BA",
          "Chair BB"
        ],
        "startAt": "2021-11-18T19:59:06.311058+00:00",
        "endAt": "2021-11-18T21:59:06.311058+00:00",
        "backgroundColor": 16711680,
      }
    ]
  };

const mockEvents = sectionsInfoToCalendarEvents(fetchedConferenceMock.sections);

const searchSuffix = <CalendarTwoTone ></CalendarTwoTone>;

const eventPropGetter = (event, start, end, isSelected) => {
	console.log(event.title, event.color)
	const backgroundColor = '#' + numberToHexColor(event.color);
	const style = {
		backgroundColor: backgroundColor,
		color: 'black',
	};

	return {
		style,
	};
};

const Calendar = () => {
    const [isModalVisible, showEventModal] = useState(false);
    const [openedSectionInfo, setOpenedSectionInfo] = useState({});
	const [filteredEvents, setFilteredEvents] = useState(mockEvents);

    const onSelectEvent = (event) => {
        showEventModal(true);
        setOpenedSectionInfo(event);
    }

	const onSearch = ({ target: { value } }) => {
		setFilteredEvents(mockEvents.filter((section) =>
				section.title.toLowerCase().includes(value.toLowerCase()) ||
				section.chairs.join('').toLowerCase().includes(value.toLowerCase())
			));
	}

    return (
		<div className="calendar">
			<Row className="calendar__search" justify="end">
				<Col sm={8}>
					<Search
						placeholder="Search Through Sections"
						allowClear
						suffix={searchSuffix}
						onChange={onSearch}
						/>
				</Col>
			</Row>
			<div className="calendar__panel">
				<ReactCalendar
					localizer={localizer}
					events={filteredEvents}
					defaultView='week'
					onSelectEvent={onSelectEvent}
					views={['week', 'day']}
					eventPropGetter={eventPropGetter}
				/>
				<SectionModal
					visible={isModalVisible}
					setVisibility={showEventModal}
					sectionInfo={openedSectionInfo}
				/>
			</div>
		</div>
    )
}

export default Calendar;
