import React from 'react';

import { normalizeChangeObject } from './helper';

const AddType = ({ newObject }) => {
	const newObjectKeys = Object.keys(newObject);

	const newChanges = normalizeChangeObject(newObjectKeys, newObject);

    return (
		<div className="notification">
			<div className="notification__changes">
				<div className="notification__only-new">
					<div className="notification__only-new__title">New values</div>
					{newChanges.map((nc) =>
						<div key={nc.name} className="notification__single-change">{`${nc.name}: ${nc.value}`} </div>
					)}
				</div>
			</div>
		</div>
	)
};

export default AddType;
