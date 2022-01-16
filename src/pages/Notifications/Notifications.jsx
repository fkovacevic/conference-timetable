import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import { Collapse, Spin } from 'antd';
import { BellTwoTone, MessageFilled } from '@ant-design/icons'

import AuthContext from '../../auth_store/auth-context';
import { getUserNotifications } from '../../services/NotificationService';
import Notification from './Notification/Notification';
import NotificationTypes from '../../constants/enums/NotificationTypes';
import './_notifications.scss';

const { Panel } = Collapse;

// const fakeNotifications = [
// 	{
// 	  "eventId": 2,
// 	  "eventTitle": "new title",
// 	  "createdAt": "2022-01-13T19:33:54.108012+00:00",
// 	  "type": "eventEdited",
// 	  "data": "{\"id\":2,\"old\":{\"title\":\"e\",\"description\":\"string\",\"startAt\":\"2022-01-13T18:24:44.288+00:00\",\"endAt\":\"2022-01-13T18:24:44.288+00:00\"},\"new\":{\"title\":\"new title\",\"description\":\"string\",\"startAt\":\"2022-01-13T18:24:44.288+00:00\",\"endAt\":\"2022-01-13T18:24:44.288+00:00\"}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:27:52.7638+00:00",
// 	  "type": "sectionDeleted",
// 	  "data": "{\"id\":3,\"old\":{\"eventId\":1,\"locationId\":1,\"title\":\"new title\",\"chairs\":[\"string\"],\"startAt\":\"2022-01-13T19:27:17.017+00:00\",\"endAt\":\"2022-01-13T19:27:17.017+00:00\",\"backgroundColor\":0}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:27:40.633295+00:00",
// 	  "type": "sectionEdited",
// 	  "data": "{\"id\":3,\"old\":{\"eventId\":1,\"locationId\":1,\"title\":\"string\",\"chairs\":[\"string\"],\"startAt\":\"2022-01-13T19:27:00.789+00:00\",\"endAt\":\"2022-01-13T19:27:00.789+00:00\",\"backgroundColor\":0},\"new\":{\"eventId\":1,\"locationId\":1,\"title\":\"new title\",\"chairs\":[\"string\"],\"startAt\":\"2022-01-13T19:27:17.017+00:00\",\"endAt\":\"2022-01-13T19:27:17.017+00:00\",\"backgroundColor\":0}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:27:09.516836+00:00",
// 	  "type": "sectionAdded",
// 	  "data": "{\"id\":3,\"new\":{\"eventId\":1,\"locationId\":1,\"title\":\"string\",\"chairs\":[\"string\"],\"startAt\":\"2022-01-13T19:27:00.789+00:00\",\"endAt\":\"2022-01-13T19:27:00.789+00:00\",\"backgroundColor\":0}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:26:38.099267+00:00",
// 	  "type": "presentationDeleted",
// 	  "data": "{\"id\":5,\"old\":{\"sectionId\":1,\"title\":\"new title\",\"authors\":[\"string\"],\"description\":\"string\",\"position\":1,\"durationMinutes\":1,\"attachment\":\"string\",\"mainAuthorPhoto\":\"string\"}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:26:17.583973+00:00",
// 	  "type": "presentationEdited",
// 	  "data": "{\"id\":5,\"old\":{\"sectionId\":1,\"title\":\"string\",\"authors\":[\"string\"],\"description\":\"string\",\"position\":1,\"durationMinutes\":1,\"attachment\":\"string\",\"mainAuthorPhoto\":\"string\"},\"new\":{\"sectionId\":1,\"title\":\"new title\",\"authors\":[\"string\"],\"description\":\"string\",\"position\":1,\"durationMinutes\":1,\"attachment\":\"string\",\"mainAuthorPhoto\":\"string\"}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:25:22.98225+00:00",
// 	  "type": "presentationAdded",
// 	  "data": "{\"id\":5,\"new\":{\"sectionId\":1,\"title\":\"string\",\"authors\":[\"string\"],\"description\":\"string\",\"position\":1,\"durationMinutes\":1,\"attachment\":\"string\",\"mainAuthorPhoto\":\"string\"}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:24:36.800241+00:00",
// 	  "type": "locationDeleted",
// 	  "data": "{\"id\":4,\"old\":{\"eventId\":1,\"name\":\"new name\"}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:24:22.955785+00:00",
// 	  "type": "locationEdited",
// 	  "data": "{\"id\":4,\"old\":{\"eventId\":1,\"name\":\"string\"},\"new\":{\"eventId\":1,\"name\":\"new name\"}}"
// 	},
// 	{
// 	  "eventId": 1,
// 	  "eventTitle": "Event A",
// 	  "createdAt": "2022-01-13T19:23:17.854783+00:00",
// 	  "type": "locationAdded",
// 	  "data": "{\"id\":4,\"new\":{\"eventId\":1,\"name\":\"string\"}}"
// 	}
//   ]



const Notifications = () => {

	const { userid } = useContext(AuthContext);
	const [notifications, setNotifications] = useState([]);
	const [isLoading, setIsLoading] = useState(false);


	useEffect(() => {
		const swListener = new BroadcastChannel('swListener');
		swListener.onmessage = handleSwMessage;
		async function fetchData() {
			return await getUserNotifications(userid);
		}
		setIsLoading(true);
		fetchData()
			.then((notifications) => {
				setNotifications(notifications);
				setIsLoading(false);
			})
			.catch((err) => console.error(err))

		return () => {
			swListener.removeEventListener('swListener', handleSwMessage);
		};
	}, []);

	function handleSwMessage() {
		console.log('Received message!');
	}


	function notificationsMapper (notification, index) {
		const { eventTitle, type, createdAt, data, eventId } = notification;

		const eventChanges = JSON.parse(data);
		const time = moment(createdAt).format('DD.MM. HH:mm:ss');
		const notificationTitleMessage = `${time}: ${eventTitle} Has ${NotificationTypes[type]}!`;
		const notificationTitle = <b><MessageFilled style={{ color: '#1E3D58', marginRight: '10px', fontSize: '16px'}}/>{notificationTitleMessage}</b>;

		return (
			<Panel header={notificationTitle} key={index} >
				<Notification eventChanges={eventChanges} eventId={eventId} key={index}/>
			</Panel>
		);
	}

	return <>
		<div className="notifications">
			<div className="notifications__header"><BellTwoTone twoToneColor="#ff9100" color='blue'/></div>
			<div className="notifications__box">
				<div className="notifications__box__scroll">
					{isLoading ?
					<div className="notifications__box__scroll__loading">
						<Spin size="large"/>
					</div> :
					<div className="notifications__box__single-notification">
						{notifications && notifications.length > 0 ?
							<Collapse  expandIconPosition='right'>
								{notifications?.map(notificationsMapper)}
							</Collapse> :
							<div className="notifications__no-notifications">
								<div> No notifications to show!</div>
								<span className="notifications__no-notifications__shrug"> ¯\_(ツ)_/¯ </span>
							</div>
							}
					</div>
					}
				</div>
			</div>
		</div>
	</>
}

export default Notifications;
