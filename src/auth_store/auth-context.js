import axios from "axios";
import React, { useState } from "react";
import apiPath from "../constants/api/apiPath";
import { unsubscribeUser, unsubscribeUserReturnSubscription } from "../common/common";
import { clearCacheAtLogout } from "../common/common";
// let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isAdmin: false,
  isLoggedIn: false,
  login: (token, uid) => {},
  logout: () => {},
  userid: undefined,
  isAdmin: false,
});

const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");
  if (storedToken && storedToken.trim() !== "") {
    return storedToken;
  }
  return null;
};

const retrieveIsAdmin = () => {
  return localStorage.getItem("isAdmin") === 'true';
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  const retievedUserid = localStorage.getItem("userid");
  const retievedAdministrator = localStorage.getItem("isAdmin") === "true";

  //console.log(tokenData);

  const [token, setToken] = useState(tokenData);
  const [userid, setUserid] = useState(retievedUserid);
  const [isAdministrator, setIsAdministrator] = useState(retievedAdministrator);

  const userIsLoggedIN = !!token;

  const logoutHandler = async () => {
    var uId = userid;
    var uToken = token;

    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("isAdmin");

    setToken(null);
    setUserid(undefined);
    setIsAdministrator(false);

    clearCacheAtLogout();
    const {endpoint}= await unsubscribeUserReturnSubscription();
    console.log("endpoint je " + endpoint);
    axios
      .delete(`${apiPath}/Users/${uId}/Subscriptions`, {
        headers: {
          Authorization: "Bearer " + uToken, //localStorage.getItem("token"),
        },
        data: {
          endpoint: endpoint, // This is the body part
        },
      })
      .then(async (res) => {
        console.log("Uspio si deletat s --> ", res.status);
        unsubscribeUser();
        // const sub = await unsubscribeUserReturnSubscription();
        // console.log(sub);
        // console.log("endpoint je " + sub.endpoint);
        // delete s URLom
      })
      .catch((err) => {
        console.log(err.message ?? err);
      });
    window.location.assign("/login");
  };

  const loginHandler = (token, userid, isAdmin) => {
    console.log("token je sad " + token);
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
    localStorage.setItem("isAdmin", isAdmin);
    setUserid(userid);
    setToken(token);
    setIsAdministrator(isAdmin);
  };

  //   useEffect(() => {
  //     if (tokenData) {
  //       console.log("This is the duration" + tokenData.duration);
  //       logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  //     }
  //   }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIN,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
    userid: userid,
    isAdmin: isAdministrator,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
