import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);