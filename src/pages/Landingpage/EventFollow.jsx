import React from "react";
import { Button } from "antd";
import classes from "./EventFollow.module.scss";
import { Link, NavLink } from "react-router-dom";
function EventFollow(props) {
  return (
    <div className={classes.card}>
      <div className={classes.flex}>
        <h2 className={classes.eventHover}>
          <NavLink className={classes.eventHover} to={"/calendar/" + props.id}>
            {props.title}
          </NavLink>
        </h2>
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
