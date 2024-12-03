import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material";

const OverdueTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && !task.completed
  ); 

  return (
    <div>
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Overdue Tasks
      </Typography>
      <Grid container spacing={2}>
        {overdueTasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper elevation={3} sx={{ padding: "20px", borderRadius: "10px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {task.title}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                {task.description}
              </Typography>
              <Typography variant="body2">Due: {task.dueDate}</Typography>
            </Paper>
          </Grid>
        ))}
        {overdueTasks.length === 0 && (
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            No overdue tasks available.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default OverdueTasks;
