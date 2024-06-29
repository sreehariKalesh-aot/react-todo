import React from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap';
import TaskCard from './taskCard';
import TaskModal from './taskModal';

const TaskContainer = ({ tasks, handleDelete, toggleStatus, searchTerm, sortBy, handleEdit, handleDeleteCompleted }) => {
  const activeTasksFiltered = tasks.filter(
    (task) =>
      !task.completed &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedTasksFiltered = tasks.filter(
    (task) =>
      task.completed &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortTasks = (tasksToSort) => {
    if (sortBy === 'newest') {
      return tasksToSort.slice().sort((a, b) => b.id - a.id);
    } else if (sortBy === 'oldest') {
      return tasksToSort.slice().sort((a, b) => a.id - b.id);
    } else {
      return tasksToSort;
    }
  };

  const deleteTask = (id) => {
    handleDelete(id);
  };

  const handleEditTask = (id) => {
    handleEdit(id);
  };

  const clearCompletedTasks = () => {
    const completedIds = completedTasksFiltered.map((task) => task.id);
    handleDeleteCompleted(completedIds);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h3>Active Tasks</h3>
      </div>
      {sortTasks(activeTasksFiltered).map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={() => deleteTask(task.id)}
          toggleStatus={toggleStatus}
          editTask={() => handleEditTask(task.id)}
        />
      ))}
      <div className="d-flex justify-content-between mt-4">
        <h3>Completed Tasks</h3>
        <Button variant="outline-primary" onClick={clearCompletedTasks}>
          Clear Completed Tasks
        </Button>
      </div>
      {sortTasks(completedTasksFiltered).map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          deleteTask={() => deleteTask(task.id)}
          toggleStatus={toggleStatus}
          editTask={() => handleEditTask(task.id)}
        />
      ))}
      <TaskModal show={false} handleClose={() => {}} handleSave={() => {}} /> 
    </Container>
  );
};

export default TaskContainer;
