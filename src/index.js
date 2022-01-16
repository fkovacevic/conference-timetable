import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.scss";
import { AuthContextProvider } from "./auth_store/auth-context";
import { register } from "./serviceWorkerRegistration";

ReactDOM.render(
	<AuthContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</AuthContextProvider>,
	document.getElementById("root")
);

register();
