import React, { useCallback, useEffect, useState } from "react";

// let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token,uid) => {},
  logout: () => {},
  userid: undefined,
});

const retrieveToken = () => {
  const storedToken = localStorage.getItem("token");
  if (storedToken && storedToken.trim() !== "") {
    return storedToken;
  }
  return null;
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  const retievedUserid = localStorage.getItem("userid");

  //console.log(tokenData);

  const [token, setToken] = useState(tokenData);
  const [userid, setUserid] = useState(retievedUserid);

  const userIsLoggedIN = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserid(undefined);

    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    window.location.assign("/login");
  }, []);

  const loginHandler = (token, userid) => {
    console.log("token je sad " + token);
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
    setUserid(userid);
    setToken(token);
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
    login: loginHandler,
    logout: logoutHandler,
    userid: userid,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
