import axios from "axios";

export const saveTask = (task) =>
  axios.post("http://localhost:3000/api/v1/tasks", task);

export const loadTasks = () => axios.get("http://localhost:3000/api/v1/tasks");

export const updateTask = (task) =>
  axios.put(`http://localhost:3000/api/v1/tasks/${task.id}`, {
    task: { completed_at: task.completed_at },
  });

export const setAxiosHeaders = () => {
  const csrfToken = document.querySelector("[name=csrf-token]");
  if (!csrfToken) {
    return;
  }
  const csrfTokenContent = csrfToken.content;
  csrfTokenContent &&
    (axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfTokenContent);
};
