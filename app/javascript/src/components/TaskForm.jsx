import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { setAxiosHeaders, saveTask } from "../lib/utils/ApiHelpers";

const marginSize = 30;

const FormField = styled(TextField)({
  marginTop: marginSize,
  marginBottom: marginSize,
  display: "block",
});

const initialValues = {
  name: "",
  description: "",
};

const TaskForm = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formImage, setFormImage] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = (event) => {
    setFormValues(initialValues);
    event.target.avatar.value = null;
  };

  const handleImage = (event) => {
    setFormImage(event.target.files[0]);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAxiosHeaders();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("task[name]", formValues.name);
    formData.append("task[description]", formValues.description);
    if (formImage) formData.append("task[avatar]", formImage);

    saveTask(formData)
      .then(() => {
        setError(null);
        resetForm(event);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <Box sx={{ paddingLeft: "16px" }}>
      <section data-cy="alerts">
        {error && <Alert severity="error">{error}</Alert>}
      </section>

      <form id="task-form" onSubmit={handleSubmit}>
        <FormField
          variant="outlined"
          color="secondary"
          fullWidth
          type="text"
          name="name"
          autoFocus
          placeholder="Task Name"
          required
          value={formValues.name}
          onChange={handleInput}
        />
        <FormField
          variant="outlined"
          color="secondary"
          fullWidth
          type="text"
          name="description"
          placeholder="Task Description"
          value={formValues.description}
          onChange={handleInput}
        />
        <Button
          variant="outlined"
          component="label"
          color="primary"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {formImage ? formImage.name : "Upload Avatar"}
          <input
            id="avatar"
            type="file"
            hidden
            accept="image/*"
            multiple={false}
            onChange={handleImage}
          />
          <IconButton
            color="secondary"
            aria-label="upload-avatar"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </Button>
        <div
          id="submit"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: marginSize,
          }}
        >
          {isLoading ? (
            <Button type="submit" disabled variant="contained">
              Adding...
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="secondary">
              Add
            </Button>
          )}
        </div>
      </form>
    </Box>
  );
};

export default TaskForm;
