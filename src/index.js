import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";

import "./index.scss";
import { AuthContextProvider } from "./auth_store/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
