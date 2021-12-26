import React from "react";
import { Button } from "antd";
import classes from "./EventFollow.module.css";
function EventFollow(props) {
  return (
    <div className={classes.card}>
      <div className={classes.flex}>
        <h2>{props.title}</h2>
        <Button
          onClick={() => {
            props.removeFromFollowed(props.id);
          }}
        >
          Unfollow
        </Button>
      </div>
    </div>
  );
}

export default EventFollow;
