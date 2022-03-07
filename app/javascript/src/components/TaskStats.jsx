import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const TaskStats = ({ stats }) => {
  return (
    <Box sx={{ paddingTop: 3, maxWidth: 360, paddingLeft: "16px" }}>
      <Typography variant="h5" color="text.secondary" sx={{ marginLeft: 2 }}>
        Stats
      </Typography>
      <List>
        <ListItem data-cy="closedStat">
          <ListItemText sx={{ width: 50 }}>
            <Typography variant="h5" color="text.disabled">
              {stats.closedTasks}
            </Typography>
          </ListItemText>
          <ListItemText sx={{ marginLeft: 2 }}>
            <Typography variant="h6" color="primary">
              Total Tasks Closed
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem data-cy="openStat">
          <ListItemText sx={{ width: 50 }}>
            <Typography variant="h5" color="text.disabled">
              {stats.openTasks}
            </Typography>
          </ListItemText>
          <ListItemText sx={{ marginLeft: 1 }}>
            <Typography variant="h6" color="primary">
              Total Tasks Open
            </Typography>
          </ListItemText>
        </ListItem>
        <ListItem data-cy="completionStat">
          <ListItemText sx={{ width: 50 }}>
            <Typography variant="h5" color="text.disabled">
              {`${stats.completionRate}%`}
            </Typography>
          </ListItemText>
          <ListItemText sx={{ marginLeft: 1 }}>
            <Typography variant="h6" color="text.disabled">
              Completion Rate
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

export default TaskStats;
