import React, { useContext, useState } from "react";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";
// import { useState, useContext } from "react/cjs/react.development"; remove this
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../auth_store/auth-context";
import { subscribeUser } from "../../serviceWorkerSubscription";

import { subscribeAfterLogin } from "../../common/common";
import apiPath from "../../constants/api/apiPath";
function Register(props) {
	const authCtx = useContext(AuthContext);

	const [passErr, setPassErr] = useState(false);
	const history = useHistory();
	const onFinish = (values) => {
		console.log("Received values of form: ", values);
		if (values.password !== values.password2) {
			setPassErr(true);
			setTimeout(() => {
				setPassErr(false);
			}, 3000);
		} else {
			setPassErr(false);
			axios
				.post(apiPath + "/Users", {
					...values,
				})
				.then(async (result) => {
					console.log(result.data);

					async function registerAndSubscribeUser() {
						// register();
						return await subscribeUser();
					}

					authCtx.login(
						result.data.token,
						result.data.id,
						result.data.isAdmin
					);
					history.push("/home");

					console.log("ispis registracija");

					var sub = await registerAndSubscribeUser();

					if (sub) {
						console.log("subscription received!!!");

						sub = JSON.parse(JSON.stringify(sub));
						const { keys, endpoint } = sub;
						console.log(keys, endpoint);
						subscribeAfterLogin(
							result.data.id,
							result.data.token,
							sub
						);
					} else {
						console.log("subscription NOT received!!!");
					}
				})
				.catch((err) => {
					console.log(err.message ?? err);
				});
		}
	};

	return (
		<div className={classes.flexwrapper}>
			<div className={`${classes.flex} ${classes.loginContainer}`}>
				<div>
					<h1>Conference Timetable</h1>
					<div className={classes.imgSizer}>
						<img alt="logo" src="calendar-192.png"></img>
					</div>
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your Username!",
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined className="site-form-item-icon" />
								}
								placeholder="Username"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}
						>
							<Input
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item
							name="password2"
							rules={[
								{
									required: true,
									message: "Please input your Password!",
								},
							]}
						>
							<Input
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								type="password"
								placeholder="Repeat password"
							/>
						</Form.Item>
						{passErr && (
							<Alert
								message="Passwords don't match!"
								type="error"
								showIcon
							/>
						)}

						{/* <Form.Item>
              <Link className="login-form-forgot" to="">
                Forgot password
              </Link>
            </Form.Item> */}

						<Form.Item>
							<div className={classes.flexBtn}>
								<Button
									type="primary"
									htmlType="submit"
									className="login-form-button"
								>
									Register
								</Button>
							</div>

							<p>
								Or{" "}
								<Link className={classes.loginLink} to="/login">
									Login
								</Link>
							</p>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default Register;
