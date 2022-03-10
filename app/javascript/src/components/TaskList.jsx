import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import grey from "@mui/material/colors/grey";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import useTheme from "@mui/material/styles/useTheme";

const useStyles = makeStyles(() => ({
  completed: {
    textDecoration: "line-through",
    textDecorationColor: grey[500],
    textDecorationThickness: "2px",
  },
  deleteButton: {
    "&:hover": {
      display: "block",
      color: "#ef6c00",
      backgroundColor: "transparent",
    },
  },
}));

const TaskList = ({ tasks, handleCompleted, handleDelete }) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        maxHeight: 400,
        overflow: "auto",
        paddingLeft: "16px",
      }}
    >
      <List>
        {tasks.map((task) => (
          <ListItem
            sx={{ width: "90%" }}
            key={task.id}
            className={task.completed_at ? classes.completed : null}
            data-cy={task.completed_at ? "completedTask" : "task"}
          >
            <ListItemAvatar>
              <Avatar
                alt="task-avatar"
                src={task.avatar_url}
                sx={{ width: 40, height: 40 }}
                data-cy="avatar"
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <Typography variant="h6" color="text.secondary" data-cy="name">
                  {task.name}
                </Typography>
              }
              secondary={
                <Typography color="text.disabled" data-cy="description">
                  {task.description}
                </Typography>
              }
            />
            <ListItemSecondaryAction sx={{ marginRight: -4 }}>
              {task.completed_at ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  data-cy="timestamp"
                >
                  {task.completed_at}
                </Typography>
              ) : (
                <Checkbox
                  aria-label="complete-task"
                  icon={<CheckCircleOutlineIcon />}
                  onChange={() => handleCompleted(task.id)}
                  data-cy="checkbox"
                />
              )}
            </ListItemSecondaryAction>
            <ListItemSecondaryAction
              sx={{ marginLeft: 8, display: { xs: "none", md: "block" } }}
            >
              <ListItemButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(task.id)}
                  data-cy="delete"
                >
                  <DeleteIcon
                    color="secondary"
                    className={classes.deleteButton}
                  />
                </IconButton>
              </ListItemButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
