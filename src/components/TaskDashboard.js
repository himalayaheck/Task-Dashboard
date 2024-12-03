import React, { useState } from "react";
import { Grid, Paper, Typography, Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { CheckCircle, PendingActions, EventBusy, Assignment } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, toggleComplete, editTask, reorderTasks } from "../features/tasksSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks); 
  const dispatch = useDispatch(); 

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const overdueTasks = tasks.filter((task) => new Date(task.dueDate) < new Date() && !task.completed).length;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <Assignment fontSize="large" color="primary" />,
      bgColor: "#e3f2fd",
    },
    {
      label: "Completed Tasks",
      value: completedTasks,
      icon: <CheckCircle fontSize="large" color="success" />,
      bgColor: "#e8f5e9",
    },
    {
      label: "Pending Tasks",
      value: pendingTasks,
      icon: <PendingActions fontSize="large" color="warning" />,
      bgColor: "#fff8e1",
    },
    {
      label: "Overdue Tasks",
      value: overdueTasks,
      icon: <EventBusy fontSize="large" color="error" />,
      bgColor: "#ffebee",
    },
  ];

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
      description: "Task description",
      dueDate: "2024-12-10",
      completed: false,
    };
    dispatch(addTask(newTask));
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(currentTask.id));
    setDeleteModalOpen(false);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    dispatch(editTask(currentTask));
    setEditModalOpen(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(filteredTasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    dispatch(reorderTasks(reorderedTasks));
  };

  return (
    <Box sx={{ padding: "20px" }}>
      {/* Dashboard Title */}
      <Typography variant="h4" component="div" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
        Task Dashboard
      </Typography>

      {/* Search Field */}
      <TextField
        label="Search Tasks"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />

      {/* Add Task Button */}
      <Button variant="contained" color="primary" onClick={handleAddTask} sx={{ marginBottom: "20px" }}>
        Add Task
      </Button>

      {/* Task Statistics Grid */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: stat.bgColor,
              }}
            >
              {/* Stat Icon */}
              <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>{stat.icon}</Box>
              {/* Stat Value */}
              <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                {stat.value}
              </Typography>
              {/* Stat Label */}
              <Typography variant="subtitle1" component="div">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Task List with Drag-and-Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <Grid container spacing={2} sx={{ marginTop: "20px" }} {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                  {(provided) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Paper elevation={3} sx={{ padding: "20px", borderRadius: "10px" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {task.title}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                          {task.description}
                        </Typography>
                        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
                          Due: {task.dueDate}
                        </Typography>

                        {/* Task Buttons */}
                        <Button variant="outlined" onClick={() => dispatch(toggleComplete(task.id))}>
                          {task.completed ? "Mark as Pending" : "Mark as Completed"}
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ marginLeft: "10px" }}
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setCurrentTask(task);
                            setDeleteModalOpen(true);
                          }}
                          sx={{ marginLeft: "10px" }}
                        >
                          Delete
                        </Button>
                      </Paper>
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* Edit Task Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={currentTask?.title || ""}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={currentTask?.description || ""}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Due Date"
            type="date"
            value={currentTask?.dueDate || ""}
            onChange={(e) => setCurrentTask({ ...currentTask, dueDate: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteTask} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskDashboard;