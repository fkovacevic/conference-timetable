import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import {
  MenuOutlined,
  HomeFilled,
  BellFilled,
  UserOutlined,
  ImportOutlined,
} from "@ant-design/icons";

import "./navigation-bar.scss";
import AuthContext from "../../auth_store/auth-context";

const fakeNotifications = [
  {
    eventId: 1,
    eventName: "Event o životinjama",
    note: "ponesite maske",
    eventChanges: {
      oldStart: "2021-11-18T18:59:06.311058+00:00",
      newStart: "2021-11-18T19:59:06.311058+00:00",
      oldSections: [
        {
          title: "sekcija o sisavcima",
          startAt: "2022-01-8T16:00:00.311058+00:00",
        },
      ],
      newSections: [
        {
          title: "sekcija o sisavcima",
          startAt: "2022-01-8T17:00:00.311058+00:00",
        },
      ],
    },
  },
  {
    eventId: 2,
    eventName: "Event o ženama",
    note: "ponesite maske opet",
    eventChanges: {
      oldStart: "2021-11-18T18:59:06.311058+00:00",
      newStart: "2021-11-18T19:59:06.311058+00:00",
      oldSections: [
        {
          title: "sekcija o sisavcima",
          startAt: "2022-01-8T16:00:00.311058+00:00",
        },
      ],
      newSections: [
        {
          title: "sekcija o sisavcima",
          startAt: "2022-01-8T17:00:00.311058+00:00",
        },
      ],
    },
  },
];

const NavigationBar = () => {
  const authCtx = useContext(AuthContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [newNotification, setNewNotification] = useState(null);
  const [noOfNewNotifications, setNoOfNewNotifications] = useState(0);
  const mobileWidth = 800; //800 px

  const notificationButtonStyle =
    noOfNewNotifications > 0 ? { background: "#cc3300" } : null;
  const noOfNotificationInButton =
    noOfNewNotifications > 0 ? `(${noOfNewNotifications})` : "";
  const notificationButtonName = `Notifications${noOfNotificationInButton}`;
  const notificationButtonMobClassName = `navigation-bar__option__name${
    noOfNewNotifications > 0 ? "--new-notif" : ""
  }`;
  const notificationMobIconStyle =
    noOfNewNotifications > 0 ? { color: "red" } : null;

  const menuMobile = (
    <Menu
      className="navigation-bar__dropdown"
      style={{ backgroundColor: "#1E3D58", border: "white" }}
    >
      <Menu.Item key="home" className="navigation-bar__menu-item">
        <Link to="/">
          <div className="navigation-bar__option-container">
            <HomeFilled />
            <div className="navigation-bar__option__name">Home</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="notifications" className="navigation-bar__menu-item">
        <Link to="/notifications" onClick={onNotificationsClick}>
          <div className="navigation-bar__option-container">
            <BellFilled style={notificationMobIconStyle} />
            <div className={notificationButtonMobClassName}>
              {notificationButtonName}
            </div>
          </div>
        </Link>
      </Menu.Item>
      {!authCtx.isAdmin && (
        <Menu.Item key="admin" className="navigation-bar__menu-item">
          <Link to="/admin">
            <div className="navigation-bar__option-container">
              <UserOutlined />
              <div className="navigation-bar__option__name">Admin</div>
            </div>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item
        key="logout"
        className="navigation-bar__menu-item"
        onClick={authCtx.logout}
      >
        <Link>
          <div className="navigation-bar__option-container">
            <ImportOutlined />
            <div className="navigation-bar__option__name">Logout</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  function handleSwMessage(e) {
    console.log("swListener Received", e.data);
    let currentNoOfNotifications = localStorage.getItem("noOfNewNotifications");
    if (currentNoOfNotifications) {
      const newNoOfNotifications = parseInt(currentNoOfNotifications) + 1;
      localStorage.setItem("noOfNewNotifications", newNoOfNotifications);
    } else {
      localStorage.setItem("noOfNewNotifications", 1);
    }
    setNewNotification(e.data);
    setNoOfNewNotifications(
      (oldNoOfNewNotifications) => oldNoOfNewNotifications + 1
    );
    setTimeout(() => setNewNotification(null), 3000);
  }

  function onNotificationsClick() {
    localStorage.setItem("noOfNewNotifications", 0);
    setNoOfNewNotifications(0);
    setNewNotification(null);
  }

  // fetch notifications and set how many are unseen by user
  useEffect(() => {
    const noOfFetchedNotifications = fakeNotifications.length;
    const currentUnseenNotifications = localStorage.getItem(
      "noOfNewNotifications"
    );

    if (!currentUnseenNotifications) {
      localStorage.setItem("noOfNewNotifications", noOfFetchedNotifications);
      setNoOfNewNotifications(noOfFetchedNotifications);
    } else if (+currentUnseenNotifications === 0) {
      setNoOfNewNotifications(0);
    } else {
      localStorage.setItem(
        "noOfNewNotifications",
        noOfFetchedNotifications - currentUnseenNotifications
      );
      setNoOfNewNotifications(
        noOfFetchedNotifications - currentUnseenNotifications
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    const swListener = new BroadcastChannel("swListener");
    swListener.onmessage = handleSwMessage;

    return () => {
      window.removeEventListener("resize", handleResize);
      swListener.removeEventListener("swListener", handleSwMessage);
    };
  }, []);

  return (
    <div className="navigation-bar">
      <div className="navigation-bar__logo">
        <Link to="/">
          <img
            src="/calendar-64.png"
            alt="ctIcon"
            className="navigation-bar__logo__img"
          />
        </Link>
        <div className="navigation-bar__logo__name">Conference Timetable</div>
      </div>

      {windowWidth > mobileWidth ? (
        <div className="navigation-bar__options">
          <Link to="/">
            <Button icon={<HomeFilled />}>Home</Button>
          </Link>
          <Link to="/notifications">
            <Tooltip
              visible={newNotification}
              title={newNotification}
              color="#cc3300"
              onClick={onNotificationsClick}
            >
              <Button icon={<BellFilled />} style={notificationButtonStyle}>
                {notificationButtonName}
              </Button>
            </Tooltip>
          </Link>
          {authCtx.isAdmin && (
            <Link to="/admin">
              <Button icon={<UserOutlined />}>Admin</Button>
            </Link>
          )}
          <Link onClick={authCtx.logout}>
            <Button icon={<ImportOutlined />}>Logout</Button>
          </Link>
        </div>
      ) : (
        <div className="navigation-bar__options">
          <Dropdown
            overlay={menuMobile}
            trigger="click"
            placement="bottomCenter"
            className="navigation-bar__dropdown"
          >
            <Tooltip
              visible={newNotification}
              title={"New Event changes!"}
              color="#cc3300"
              placement="left"
            >
              <Button icon={<MenuOutlined />}></Button>
            </Tooltip>
          </Dropdown>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
