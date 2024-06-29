import React, { useEffect, useState } from "react";
import TaskContainer from "../components/taskContainer";
import TaskModal from "../components/taskModal";
import Header from "../components/header";
import DeleteModal from "../components/deleteModal";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null); 

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("TodoList"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
    setTaskToEdit(null); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteModal = (id) => {
    setTaskIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setTaskIdToDelete(null); 
  };

  const handleSave = (task) => {
    let updatedTasks;

    if (task.id !== undefined) {
      updatedTasks = tasks.map(t => t.id === task.id ? task : t);
    } else {
      const newTask = {
        ...task,
        id: Math.floor(Math.random() * 1000),
        completed: false,
      };
      updatedTasks = [...tasks, newTask];
    }

    setTasks(updatedTasks);
    localStorage.setItem("TodoList", JSON.stringify(updatedTasks));
    setShowModal(false);
  };

  const handleEditingTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (id !== null) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem("TodoList", JSON.stringify(updatedTasks));
      setShowDeleteModal(false);
      setTaskIdToDelete(null);
    }
  };

  const deleteCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    localStorage.setItem("TodoList", JSON.stringify(updatedTasks));
    setShowDeleteModal(false);
    setTaskIdToDelete(null);
  };

  const toggleStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("TodoList", JSON.stringify(updatedTasks));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  return (
    <>
      <Header
        handleShowModal={handleShowModal}
        handleSearch={handleSearch}
        handleSort={handleSort}
      />
      <TaskContainer
        tasks={tasks}
        handleDelete={handleDeleteModal}
        toggleStatus={toggleStatus}
        searchTerm={searchTerm}
        sortBy={sortBy}
        handleDeleteCompleted={deleteCompleted}
        handleEdit={handleEditingTask} 
      />
      <TaskModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        taskToEdit={taskToEdit} 
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => handleDelete(taskIdToDelete)}
        taskId={taskIdToDelete}
      />
    </>
  );
};

export default Index;