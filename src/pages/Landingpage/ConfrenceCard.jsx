import React from "react";
import { Button } from "antd";
import moment from "moment";

import classes from "./ConfrenceCard.module.scss";

function ConfrenceCard(props) {
  return (
    <div className={classes.card}>
      <div className={classes.flex}>
        <h2>{props.title}</h2>
        <Button
          onClick={() => {
            props.addToFollowed(props.confObj);
          }}
        >
          Follow
        </Button>
      </div>
      <p>{props.description}</p>
      <p>{`Starts at: ${moment(props.startAt).format('DD.MM. HH:mm')}`}</p>
      <p>{`Ends at: ${moment(props.endAt).format('DD.MM. HH:mm')}`}</p>
      {/* <p>{"Section count:  " + props.sectionCount}</p> */}
    </div>
  );
}

export default ConfrenceCard;
