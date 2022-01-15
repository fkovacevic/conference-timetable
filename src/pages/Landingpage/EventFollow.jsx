import React from "react";
import { Button } from "antd";
import classes from "./EventFollow.module.scss";
import { NavLink } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

function EventFollow(props) {
	const history = useHistory();

	const redirectToCalendar = () => {
		history.push("/calendar/" + props.id);
	};

	return (
		<div className={classes.card}>
			<div className={classes.flexColumn}>
				<h2 className={classes.eventHover}>
					<NavLink
						className={classes.eventHover}
						to={"/calendar/" + props.id}
					>
						{props.title}
					</NavLink>
				</h2>
				<div className={classes.flex}>
					<Button
						className={classes.btnUnfollow}
						onClick={() => {
							props.removeFromFollowed(props.id);
						}}
					>
						Unfollow
					</Button>
					<ArrowRightOutlined
						style={{ fontSize: "2em" }}
						onClick={redirectToCalendar}
						className={classes.arrow}
					/>
				</div>
			</div>
		</div>
	);
}

export default EventFollow;
