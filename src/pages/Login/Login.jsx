import React, { useContext, useState, useEffect } from "react";

import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import classes from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../auth_store/auth-context";

import { subscribeUser } from "../../serviceWorkerSubscription";
import { register } from "../../serviceWorkerRegistration";

import { subscribeAfterLogin } from "../../common/common";
import apiPath from "../../constants/api/apiPath";

function Login(props) {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [passErr, setPassErr] = useState(false);

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .post(apiPath + "/Users/Sessions", {
        ...values,
      })
      .then(async (result) => {
        console.log(result.data);

        async function registerAndSubscribeUser() {
          await register();
          return await subscribeUser();
        }

        authCtx.login(result.data.token, result.data.userId, false);
        history.push("/home");

        console.log("ispis login");

        var sub = await registerAndSubscribeUser();

        if (sub) {
          sub = JSON.parse(JSON.stringify(sub));
          const { keys, endpoint } = sub;
          console.log(keys, endpoint);
          // console.log("AWAIT piki je debel sad se subsrakjbam ide config! \n");
          // console.log(JSON.stringify(sub));
          subscribeAfterLogin(result.data.userId, result.data.token, sub);
        } else {
          console.log("eto sranje");
        }
      })
      .catch((err) => {
        console.log(console.log(err.message ?? err));
        setPassErr(err.message);
        setTimeout(() => {
          setPassErr(false);
        }, 3000);
      });
  };

  return (
    <div className={classes.flexwrapper}>
      <div className={`${classes.flex} ${classes.loginContainer}`}>
        <div>
          <h1>Conference Timetable</h1>
          <div className={classes.imgSizer}>
            <img src="calendar-192.png"></img>
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
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {passErr && (
              <Alert message="Invalid credentials" type="error" showIcon />
            )}
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}

            <Form.Item>
              <div className={classes.flexBtn}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </div>

              <p>
                Or{" "}
                <Link className={classes.loginLink} to="/register">
                  register now!
                </Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
