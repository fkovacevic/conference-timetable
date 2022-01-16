import React from 'react';

import { normalizeChangeObject } from './helper';

const EditType = ({ oldObject, newObject }) => {
	const oldObjectKeys = Object.keys(oldObject);
	const newObjectKeys = Object.keys(newObject);

	const oldChanges = normalizeChangeObject(oldObjectKeys, oldObject);
	const newChanges = normalizeChangeObject(newObjectKeys, newObject);

    return (
		<div className="notification">
			<div className="notification__changes">
				<div className="notification__old">
					<div className="notification__old__title">Old values</div>
					{oldChanges.map((oc) =>
						<div key={oc.name} className="notification__single-change">{`${oc.name}: ${oc.value}`} </div>
					)}
				</div>
				<div className="notification__new">
					<div className="notification__new__title">New Values</div>
					{newChanges.map((nc) =>
						<div key={nc.name} className="notification__single-change">{`${nc.name}: ${nc.value}`} </div>
					)}
				</div>
			</div>
		</div>
	)
};

export default EditType;