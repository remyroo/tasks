import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";
import {
  loadTasks,
  setAxiosHeaders,
  updateTask,
} from "../lib/utils/ApiHelpers";

const TaskHome = () => {
  const [tasks, setTasks] = useState(null);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks()
      .then(({ data }) => {
        setTasks(data);
        calculateStats(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  const handleCompleted = (id) => {
    const timeFormatter = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
    });
    const targetTask = tasks.find((task) => task.id === id);
    targetTask.completed_at = timeFormatter.format(Date.now());

    updateTaskStatus(targetTask);
  };

  const updateTaskStatus = (task) => {
    setAxiosHeaders();

    updateTask(task)
      .then(({ data }) => {
        const updatedTask = data;
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        calculateStats(updatedTasks);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const calculateStats = (tasks) => {
    if (tasks.length === 0) {
      setStats(null);
    } else {
      const totalTasks = tasks.length;
      const closedTasks = tasks.filter((task) => task.completed_at).length;
      const openTasks = totalTasks - closedTasks;
      const completionRate = Math.floor((closedTasks / totalTasks) * 100);

      setStats({ closedTasks, openTasks, completionRate });
    }
  };

  return (
    <div id="task-home">
      <section data-cy="alerts">
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingTop: 2.5 }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {isLoading && <CircularProgress color="primary" data-cy="spinner" />}
          {tasks?.length === 0 ? (
            <Typography>
              Click the <AddIcon color="secondary" /> above to add a task
            </Typography>
          ) : null}
        </Box>
      </section>

      <section data-cy="tasks">
        {tasks && <TaskList tasks={tasks} handleCompleted={handleCompleted} />}
      </section>

      {stats && (
        <section data-cy="stats">
          <Divider variant="fullWidth" />
          <TaskStats stats={stats} />
        </section>
      )}
    </div>
  );
};

export default TaskHome;
