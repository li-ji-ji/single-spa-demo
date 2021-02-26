import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import singleSpaReact, { SingleSpaContext } from "single-spa-react";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
