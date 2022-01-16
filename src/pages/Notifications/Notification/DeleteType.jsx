import React from 'react';

import { normalizeChangeObject } from './helper';

const DeleteType = ({ oldObject }) => {
	const oldObjectKeys = Object.keys(oldObject);

	const oldChanges = normalizeChangeObject(oldObjectKeys, oldObject);

    return (
		<div className="notification">
			<div className="notification__changes">
				<div className="notification__only-old">
					<div className="notification__only-old__title">Old values</div>
					{oldChanges.map((oc) =>
						<div key={oc.name} className="notification__single-change">{`${oc.name}: ${oc.value}`} </div>
					)}
				</div>
			</div>
		</div>
	)
};

export default DeleteType;