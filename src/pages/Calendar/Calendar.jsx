import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Calendar as ReactCalendar, momentLocalizer } from 'react-big-calendar'
import { Input, Spin } from 'antd';
import { CalendarTwoTone } from '@ant-design/icons'

import { sectionsInfoToCalendarEvents, locationsToMap } from './helper';
import { numberToHexColor } from '../../common/common'
import SectionModal from './SectionModal/SectionModal'
import { getConference, getConferenceSections, getConferenceLocations } from '../../services/ConferenceService'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './_calendar.scss';

const localizer = momentLocalizer(moment);

const { Search } = Input;

// const fetchedConferenceMock = {
//     "id": 1,
//     "title": "Event A",
//     "description": "Event A Description",
//     "startAt": "2021-11-11T18:59:06.311058+00:00",
//     "endAt": "2021-11-16T18:59:06.311058+00:00",
//     "sections": [
//       {
//         "id": 1,
//         "locationId": 1,
//         "locationName": 'D3',
//         "title": "Section A",
//         "chairs": [
//           "Chair AA",
//           "Chair AB"
//         ],
//         "startAt": "2021-11-18T16:00:00.311058+00:00",
//         "endAt": "2021-11-18T22:00:00.311058+00:00",
//         "backgroundColor": 2156287
//       },
//       {
//         "id": 2,
//         "locationId": 2,
//         "locationName": 'D2',
//         "title": "Section B",
//         "chairs": [
//           "Chair BA",
//           "Chair BB"
//         ],
//         "startAt": "2021-11-18T18:59:06.311058+00:00",
//         "endAt": "2021-11-18T19:59:06.311058+00:00",
//         "backgroundColor": 255
//       },
// 	  {
//         "id": 3,
//         "locationId": 2,
//         "locationName": 'D4',
//         "title": "C section",
//         "chairs": [
//           "Chair BA",
//           "Chair BB"
//         ],
//         "startAt": "2021-11-18T19:59:06.311058+00:00",
//         "endAt": "2021-11-18T21:59:06.311058+00:00",
//         "backgroundColor": 16711680,
//       }
//     ]
//   };

//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmJmIjoxNjQwMzUwMDMwLCJleHAiOjE2NDA3ODIwMzAsImlhdCI6MTY0MDM1MDAzMH0.lY7TgaJjTIRWh_TJGICMN7e4gsbxZqaVLEDBkNvsXHE";
//   localStorage.setItem('token', token);

// const mockEvents = sectionsInfoToCalendarEvents(fetchedConferenceMock.sections);

const searchSuffix = <CalendarTwoTone color='F35657'></CalendarTwoTone>;

const Calendar = () => {
	const { conferenceId } = useParams();

    const [isModalVisible, showEventModal] = useState(false);
    const [openedSectionInfo, setOpenedSectionInfo] = useState({});
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [conference, setConference] = useState();
	const [allSections, setAllSections] = useState([]);
	const [locationsMap, setLocationsMap] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [defaultView, ] = useState(window.innerWidth > 600 ? 'week' : 'day');
	const [currentDate, setCurrentDate] = useState(undefined)
	const fetchedSections = useRef([]);

    useEffect(() => {
		async function fetchData() {
			const conference = await getConference(conferenceId);
			const sections = await getConferenceSections(conferenceId);
			const locations = await getConferenceLocations(conferenceId);

			setConference(conference);
			setCurrentDate(new Date(conference.startAt));
			fetchedSections.current = sections;
			setLocationsMap(locationsToMap(locations));
		}
		setIsLoading(true);
		fetchData().then(() => setIsLoading(false));
    }, [conferenceId]);

	useEffect(() => {
		const calendarEvents = sectionsInfoToCalendarEvents(fetchedSections.current, locationsMap);
		setFilteredEvents(calendarEvents);
		setAllSections(calendarEvents);

	}, [locationsMap])


    function onSelectEvent(event) {
        showEventModal(true);
        setOpenedSectionInfo(event);
    }

	const onSearch = ({ target: { value } }) => {
		setFilteredEvents(allSections.filter((section) =>
				section.title.toLowerCase().includes(value.toLowerCase()) ||
				section.chairs.join('').toLowerCase().includes(value.toLowerCase())
			));
	}

  	const eventPropGetter = (event) => {
		const backgroundColor = '#' + numberToHexColor(event.color);
		const showEvent = filteredEvents.find((fe) => event.id === fe.id);
		const style = {
			backgroundColor: backgroundColor,
			color: 'black',
			display: showEvent ? 'block' : 'none',
		};

		return {
			style,
		};
  };

	let conferenceInfo = '';
  	if (conference) {
		const { title, startAt, endAt } = conference;
		conferenceInfo = `${title}: ${moment(startAt).format('hh:mm A')} - ${moment(endAt).format('hh:mm A')}`
	}


    return (
		isLoading ?
		<div className="calendar--loading">
			<Spin size='large' tip='Loading calendar...' />
		</div> :
		<>
			<div className="calendar">
				<div className="calendar__header-wrapper">
					<div className="calendar__header">
						<div className="calendar__header__info">
							{conferenceInfo}
						</div>
						<div className="calendar__header__search">
							<Search
								placeholder="Search through sections"
								allowClear
								suffix={searchSuffix}
								onChange={onSearch}
								/>
						</div>
					</div>
				</div>
				<div className="calendar__panel-wrapper">
					<div className="calendar__panel">
						<ReactCalendar
							localizer={localizer}
							events={allSections}
							defaultView={defaultView}
							onSelectEvent={onSelectEvent}
							views={['day', 'week']}
							eventPropGetter={eventPropGetter}
							date={currentDate}
							onNavigate={date => {
								setCurrentDate(date);
							}}
						/>
						<SectionModal
							visible={isModalVisible}
							setVisibility={showEventModal}
							sectionInfo={openedSectionInfo}
						/>
					</div>
				</div>
			</div>
		</>
    )
}

export default Calendar;