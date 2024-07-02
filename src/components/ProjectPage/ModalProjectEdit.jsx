import React, { useState } from 'react'
import { Button, ListGroup, Modal, Form } from 'react-bootstrap'
import { Form as RouterForm, useActionData, useFetcher, useSubmit } from 'react-router-dom';
import fromUTCToDateTimeLocalInputFormat from '../../utils/fromUTCToDateTimeLocal';

const ModalProjectEdit = ({project, showEdit, setShowEdit}) => {
  const submit = useSubmit();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      submit(
        form, 
        {method: "post"}
      );
      setShowEdit(false);
    } else {
      setValidated(true);
    }
  }

  return (
    <Modal show={showEdit} animation={false} onHide={() => setShowEdit(false)} fullscreen='sm-down'>
    <Modal.Header closeButton>
      <Modal.Title>{project.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit} id="edit-project-form" as={RouterForm} noValidate validated={validated} className="d-flex flex-column gap-1">
      <Form.Group controlId='project-name'>
        <Form.Label>Name (required):</Form.Label>
        <Form.Control defaultValue={project.name} type="text" name="name" placeholder="name" maxLength={100} required  />
        <Form.Text>No more than 100 characters</Form.Text>
      </Form.Group>
      <Form.Group controlId='project-deadline'>
        <Form.Label>Deadline:</Form.Label>
        <Form.Control 
          defaultValue={project.deadline?fromUTCToDateTimeLocalInputFormat(project.deadline):''}
          type="datetime-local" 
          name="deadline" 
        />
      </Form.Group>
      <Form.Group controlId="select-status">
        <Form.Label>Status:</Form.Label>
        <Form.Select name="status" defaultValue={project.status} required>
          {['In progress', 'Finished', 'Dropped'].map((status, i)=>(
            <option key={i} value={status}>{status}</option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowEdit(false)}>
        Close
      </Button>
      <Button type="submit" form="edit-project-form" variant="primary">
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalProjectEdit