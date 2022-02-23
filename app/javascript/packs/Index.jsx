import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskApp from "../src/components/TaskApp";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Router>
      <Routes>
        <Route path="*" element={<TaskApp />} />
      </Routes>
    </Router>,
    document.getElementById("root")
  );
});
