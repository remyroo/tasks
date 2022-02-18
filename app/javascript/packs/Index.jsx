import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./components/TaskList";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<TaskList />, document.getElementById("root"));
});
