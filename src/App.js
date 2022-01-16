import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Calendar from "./pages/Calendar/Calendar";
import Notifications from "./pages/Notifications/Notifications";
import NavigationBar from "./common/NavigationBar/NavigationBar";

import "./index.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ConferenceSearch from "./pages/Landingpage/ConferenceSearch";
import AuthContext from "./auth_store/auth-context";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
	const authCtx = useContext(AuthContext);

	return (
		<>
			{/* <Button onClick={unSub}>an sab ebbe</Button> */}
			<BrowserRouter>
				{authCtx.isLoggedIn && <NavigationBar></NavigationBar>}
				<Switch>
					{!authCtx.isLoggedIn && (
						<Route exact path="/">
							<Redirect to="login"></Redirect>
						</Route>
					)}
					{authCtx.isLoggedIn && (
						<Route exact path="/">
							<Redirect to="home"></Redirect>
						</Route>
					)}

					{!authCtx.isLoggedIn && (
						<Route exact path="/login">
							<Login />
						</Route>
					)}
					{!authCtx.isLoggedIn && (
						<Route exact path="/register">
							<Register />
						</Route>
					)}
					{authCtx.isLoggedIn && (
						<Route exact path="/home">
							<ConferenceSearch></ConferenceSearch>
						</Route>
					)}
					{authCtx.isLoggedIn && (
						<Route exact path="/calendar/:conferenceId">
							<Calendar />
						</Route>
					)}
					<Route path="/tryout">
						<Homepage></Homepage>
					</Route>
					<Route path="/error">
						<ErrorPage></ErrorPage>
					</Route>
					{authCtx.isLoggedIn && (
						<Route exact path="/notifications">
							<Notifications />
						</Route>
					)}
					<Route path="*">
						<Redirect to="/" />
					</Route>
				</Switch>
			</BrowserRouter>
		</>
	);
};

export default App;
