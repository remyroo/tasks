import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskForm from "./TaskForm";

class TaskApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  render() {
    return (
      <div className="content">
        <Routes>
          <Route path="/new" element={<TaskForm />} />
        </Routes>
      </div>
    );
  }
}

export default TaskApp;
