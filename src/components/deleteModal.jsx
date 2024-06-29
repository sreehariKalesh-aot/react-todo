import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleDelete }) => {

  const confirmDelete = (id) => {
    handleDelete(id);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header  className=' border-bottom-0 ' closeButton>
      </Modal.Header>
      <Modal.Body className="delete-body">
      <Modal.Title  className='delete-text'>Delete</Modal.Title>
        <p className='delete-p'>Are you sure you want to delete this task?</p>
      </Modal.Body>
      <Modal.Footer className=' justify-content-center border-top-0   pt-0 '>
        <Button   className=' btn-light border-1 border-secondary' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={(id)=>confirmDelete(id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
