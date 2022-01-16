import React, { useCallback, useEffect, useState } from "react";

// let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isAdmin: false,
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

const retrieveIsAdmin = () => {
  return localStorage.getItem("isAdmin") === 'true';
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  const retievedUserid = localStorage.getItem("userid");

  //console.log(tokenData);

  const [token, setToken] = useState(tokenData);
  const [userid, setUserid] = useState(retievedUserid);  
  const [isAdmin, setIsAdmin] = useState(retrieveIsAdmin());

  const userIsLoggedIN = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserid(undefined);
    setIsAdmin(false);

    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("isAdmin");

    window.location.assign("/login");
  }, []);

  const loginHandler = (token, userid, admin) => {
    console.log("token je sad " + token);
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
    localStorage.setItem("isAdmin", admin);
    setUserid(userid);
    setToken(token);
    setIsAdmin(admin)
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
