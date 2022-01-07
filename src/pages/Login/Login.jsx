import React, { useContext, useState } from "react";

import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthContext from "../../auth_store/auth-context";

import { subscribeUser } from "../../serviceWorkerSubscription";
import { register } from "../../serviceWorkerRegistration";

export const subscribeAfterLogin = (userId, token) => {
  subscribeUser.then((subscription) => {
    console.log(subscription);
    //     axios
    //       .post(
    //         `http://localhost:5000/api/Users/${userId}/Subscriptions`,
    //         {
    //           ...subscription, // This is the body part
    //         },
    //         {
    //           headers: {
    //             Authorization: "Bearer " + token, //localStorage.getItem("token"),
    //           },
    //         }
    //       )
    //       .then();
  });
};
async function registerAndSubscribeUser() {
  await register();
  return await subscribeUser();
}

function Login(props) {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [passErr, setPassErr] = useState(false);

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    axios
      .post("http://localhost:5000/api/Users/Sessions", {
        ...values,
      })
      .then(async (result) => {
        console.log(result.data);

        authCtx.login(result.data.token, result.data.userId);
        //subscribeAfterLogin(result.data.userId, result.data.token);
        // const filipGej = await subscribeUser();
        // console.log(filipGej);

        

        history.push("/home");
        return registerAndSubscribeUser();
      })
      .then((sub) => {
        console.log("jebem ti mater \n", sub);
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
          <h1>Confrence timetable</h1>
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
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <p>
                Or <Link to="/register">register now!</Link>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
