import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; 

const initialState = {
  tasks: [
    {
      id: uuidv4(),
      title: "Complete Project Report",
      description: "Prepare and submit the final project report.",
      dueDate: "2024-12-05",
      completed: false,
    },
    {
      id: uuidv4(),
      title: "Prepare for Exam",
      description: "Study Managerial Economics chapters 5 to 7.",
      dueDate: "2024-12-10",
      completed: false,
    },
  ],
  filter: "all", 
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /**
     * Add a new task
     * @param {Object} state 
     * @param {Object} action 
     */
    addTask: (state, action) => {
      const newTask = { ...action.payload, id: uuidv4(), completed: false };
      state.tasks.push(newTask);
    },

    /**
     * Edit an existing task
     * @param {Object} state
     * @param {Object} action 
     */
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },

    /**
     * Delete a task by ID
     * @param {Object} state 
     * @param {Object} action 
     */
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    /**
     * Toggle the completion status of a task
     * @param {Object} state 
     * @param {Object} action 
     */
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    /**
     * Set the task filter
     * @param {Object} state 
     * @param {Object} action 
     */
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    /**
     * Reorder tasks based on drag-and-drop action
     * @param {Object} state 
     * @param {Object} action 
     */
    reorderTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  toggleComplete,
  setFilter,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
