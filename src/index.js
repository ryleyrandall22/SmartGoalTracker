import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import { SignIn, SignUp } from "./auth";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: "#16a085",
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<BrowserRouter>
			<div>
				<Route exact path="/" component={SignIn} />
				<Route path="/signup" component={SignUp} />
				<Route path="/app" component={App} />
			</div>
		</BrowserRouter>
	</ThemeProvider>,
	document.getElementById("root")
);

serviceWorker.unregister();
