import React from "react";
import { Button } from "antd";
import classes from "./ConfrenceCard.module.scss";
const transformDate = (m) => {
  return (
    ("0" + m.getUTCHours()).slice(-2) +
    ":" +
    ("0" + m.getUTCMinutes()).slice(-2) +
    ":" +
    ("0" + m.getUTCSeconds()).slice(-2) +
    ", " +
    ("0" + m.getUTCDate()).slice(-2) +
    "/" +
    ("0" + (m.getUTCMonth() + 1)).slice(-2) +
    "/" +
    m.getUTCFullYear()
  );
};
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
      <p>{"Start:  " + transformDate(new Date(props.startAt))}</p>
      <p>{"End:  " + transformDate(new Date(props.endAt))}</p>
      {/* <p>{"Section count:  " + props.sectionCount}</p> */}
    </div>
  );
}

export default ConfrenceCard;
