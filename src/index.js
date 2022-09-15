import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { ReactDOM } from "react";
import { App } from "./components/app";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
