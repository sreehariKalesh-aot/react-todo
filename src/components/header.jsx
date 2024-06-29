import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import SearchIcon from '../assets/search.svg';
import TaskModal from './taskModal';

const Header = ({ handleShowModal, handleSearch, handleSort }) => {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    handleSort(e.target.value);
  };

  return (
    <>
      <Container className="d-flex flex-column gap-2">
        <Row className="align-items-center my-3 border-bottom pb-5">
          <Col>
            <h2>My Tasks</h2>
          </Col>
          <Col xs="auto">
            <Button variant="primary" onClick={handleShowModal}>
              Add New Task
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center d-flex gap-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by task name"
                className="custom-border"
                onChange={handleChange}
              />
              <InputGroup.Text className="bg-transparent">
                <img src={SearchIcon} alt="Search Icon" />
              </InputGroup.Text>
            </InputGroup>
          </Col>
          <div style={{ maxWidth: '230px', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '60px' }}>Sort by:</span>
            <Form.Select onChange={handleSortChange}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </Form.Select>
          </div>
        </Row>
      </Container>

      <TaskModal />
    </>
  );
};

export default Header;
