import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import EditType from './EditType';
import DeleteType from './DeleteType';
import AddType from './AddType';
import './_notification.scss';



const Notification = ({ eventChanges, eventId }) => {

	// delete ids no need for user to see that
	if (eventChanges.new) {
		Object.keys(eventChanges.new).forEach(function (key) {
			if (key.includes('Id')) {
				delete eventChanges.new[key];
			}
		});
	}
	if (eventChanges.old) {
		Object.keys(eventChanges.old).forEach(function (key) {
			if (key.includes('Id')) {
				delete eventChanges.new[key];
			}
		});
	}


	let changeType = '';
	if (eventChanges.old && eventChanges.new) {
		changeType = 'EDITED';
	} else if (eventChanges.old && !eventChanges.new) {
		changeType = 'DELETED';
	} else if (!eventChanges.old && eventChanges.new) {
		changeType = 'ADDED';
	}

	function renderChanges() {
		switch (changeType) {
			case 'EDITED':
				return (
					<EditType newObject={eventChanges.new} oldObject={eventChanges.old} />
				);
			case 'DELETED':
				return (
					<DeleteType oldObject={eventChanges.old} />
				)
			case 'ADDED':
				return (
					<AddType newObject={eventChanges.new} />
				)
			default: return null;
		}
	}
	return (
		<>
			{renderChanges()}
			{
				<div className="notification__button">
					<Link to={`/calendar/${eventId}`}>
						<Button>See New Schedule</Button>
					</Link>
				</div>
			}
		</>
	)
}

export default Notification;
