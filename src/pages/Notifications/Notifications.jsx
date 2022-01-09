import React, { useEffect } from 'react';
import { Collapse } from 'antd';
import { BellTwoTone } from '@ant-design/icons'

import NavigationBar from '../../common/NavigationBar/NavigationBar';
import Notification from './Notification/Notification';
import './_notifications.scss';

const { Panel } = Collapse;

const fakeNotifications = [
	{
		eventId: 1,
		eventName: "Event o životinjama",
		note: "ponesite maske",
		eventChanges: {
			oldStart: "2021-11-18T18:59:06.311058+00:00",
			newStart: "2021-11-18T19:59:06.311058+00:00",
			oldSections: [{
				title: 'sekcija o sisavcima',
				startAt: "2022-01-8T16:00:00.311058+00:00",
			}],
			newSections: [{
				title: 'sekcija o sisavcima',
				startAt: "2022-01-8T17:00:00.311058+00:00",
			}],
		}
	},
	{
		eventId: 2,
		eventName: "Event o ženama",
		note: "ponesite maske opet",
		eventChanges: {
			oldStart: "2021-11-18T18:59:06.311058+00:00",
			newStart: "2021-11-18T19:59:06.311058+00:00",
			oldSections: [{
				title: 'sekcija o sisavcima',
				startAt: "2022-01-8T16:00:00.311058+00:00",
			}],
			newSections: [{
				title: 'sekcija o sisavcima',
				startAt: "2022-01-8T17:00:00.311058+00:00",
			}],
		}
	}
]

const Notifications = () => {

	function handleSwMessage() {
		console.log('Received message!');
	}

	useEffect(() => {
		const swListener = new BroadcastChannel('swListener');
		swListener.onmessage = handleSwMessage;

		return () => {
			swListener.removeEventListener('swListener', handleSwMessage);
		};
	}, []);

	return <>
		<div className="notifications">
			<div className="notifications__header"><BellTwoTone twoToneColor="#ff9100" color='blue'/></div>
			<div className="notifications__box">
				<div className="notifications__box__scroll">
					<div className="notifications__box__single-notification">
						{ fakeNotifications && fakeNotifications.length > 0 ?
							<Collapse  expandIconPosition='right'>
								{fakeNotifications.map((notification, index) =>
									<Panel header={'-> ' + notification.eventName + ' has some changes!'} key={index} >
										<Notification eventChanges={notification.eventChanges} eventId={notification.eventId} key={index}/>
									</Panel>)
								}
							</Collapse> :
							<div className="notifications__no-notifications">
								<div> No notifications to show!</div>
								<span className="notifications__no-notifications__shrug"> ¯\_(ツ)_/¯ </span>
							</div>
							}
					</div>
				</div>
			</div>
		</div>
	</>
}

export default Notifications;
