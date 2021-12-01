import React from "react";
import {Route, Redirect} from "react-router-dom";

export default function AuthProtectedRoute({component: Component, ...props}) {
	return (
		<Route>
			{props.loggedIn ? <Redirect to="/movies" /> : <Component {...props} />}
		</Route>
	);
}
