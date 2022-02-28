import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import TaskForm from "./TaskForm";
import TaskHome from "./TaskHome";

const TaskApp = () => {
  return (
    <div className="content">
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskHome />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default TaskApp;
