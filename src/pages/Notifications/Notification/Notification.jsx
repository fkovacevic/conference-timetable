import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "antd";

import "./_notification.scss";

const Notification = ({ eventChanges, eventId }) => {
  return (
    eventChanges && (
      <div className="notification">
        <div className="notification__changes">
          <div className="notification__old">
            <b>Old event start time: </b>
            {moment(eventChanges.oldStart).format("hh:mm A")}
          </div>
          <div className="notification__new">
            <b>New event start time: </b>
            {moment(eventChanges.newStart).format("hh:mm A")}
          </div>
        </div>
        <div className="notification__button">
          <Link to={`/calendar/${eventId}`}>
            <Button>See New Schedule</Button>
          </Link>
        </div>
      </div>
    )
  );
};

export default Notification;
