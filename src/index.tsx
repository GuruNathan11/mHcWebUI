import "core-js";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import store from "./store/index";
import App from "./App";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

import "./global.css";
import { createRoot } from "react-dom/client";
import { HashRouter, RouteComponentProps } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter } from "react-router-dom";
const history = createBrowserHistory();
const muiTheme = createTheme();

ReactDOM.render(
  <HashRouter>
    <ScrollToTop>
      <Provider store={store}>
      <Suspense fallback="loading...">
        <Router history={history}>          
        <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
           <App />
           </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
        </Router>
        </Suspense>
      </Provider>
    </ScrollToTop>
  </HashRouter>,

  document.getElementById("root")
);

serviceWorker.unregister();
