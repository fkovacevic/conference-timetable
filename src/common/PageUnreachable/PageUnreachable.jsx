import React from "react";
import classes from "./PageUnreachable.module.scss";
import { WifiOutlined } from "@ant-design/icons";
function PageUnreachable(props) {
  return (
    <div className={classes.unreachable}>
      <h1>Page unreachable! Check your internet connection</h1>
      <WifiOutlined style={{ fontSize: "5em", color: "red" }}></WifiOutlined>
    </div>
  );
}

export default PageUnreachable;
