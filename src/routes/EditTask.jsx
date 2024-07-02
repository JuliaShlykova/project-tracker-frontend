import React, { useEffect, useReducer, useState } from 'react'
import { Button, ListGroup, Modal, Form, FloatingLabel, Toast, ToastContainer } from 'react-bootstrap';
import { Link, Form as RouterForm, useActionData, useLoaderData, useLocation, useNavigate, useSubmit } from 'react-router-dom';
import fromUTCToDateTimeLocalInputFormat from '../utils/fromUTCToDateTimeLocal';
import { AiTwotoneDelete } from 'react-icons/ai';

const EditTask = () => {
  const updatedTask = useActionData();
  const loadedTask = useLoaderData();
  let task = updatedTask||loadedTask;
  const submit = useSubmit();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description?task.description:'');
  const [dueDate, setDueDate] = useState(fromUTCToDateTimeLocalInputFormat(task.dueDate));
  const [done, toggleDone] = useReducer(a=>!a, task.done);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (updatedTask) {
      setShowToast(true);
    }
  }, [updatedTask])

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      submit(
        {
          name, 
          description,
          dueDate: new Date(dueDate).toISOString(),
          done
        }, 
        {
          method: "post",
          action: "/tasks/" + task._id + "/edit",
          encType: "application/json"
        }
      );
      // setShowToast(true);
    } else {
      setValidated(true);
    }
  }

  return (
    <div className='form-container'>
    <ToastContainer position="middle-center">
      <Toast bg='info' onClose={() => setShowToast(false)} show={showToast}>
        <Toast.Header><span className="me-auto">Result</span></Toast.Header>
        <Toast.Body>
          The task has been updated!
        </Toast.Body>
      </Toast>
    </ToastContainer>
    <Button onClick={() => {navigate(-1)}} variant="outline-primary">↤ Back</Button>
    <div className="hstack">
      <h1>Edit Task</h1>
      <RouterForm
        method="post"
        action={"/tasks/" + task._id + "/delete"}
        onSubmit={(event) => {
          if (
            !confirm(
              "Please confirm you want to delete this record."
            )
          ) {
            event.preventDefault();
          }
        }}
        className='ms-auto'
      >
        <Button type="submit" variant='outline-danger' className='btn-without-text' title='delete' aria-label='delete'><AiTwotoneDelete /></Button>
      </RouterForm>
    </div>
    <ListGroup variant='flush'>
      <ListGroup.Item className='px-0'><b>Key: </b>{task._id}</ListGroup.Item>
      <ListGroup.Item className='px-0'><b>Type: </b>{task.taskType}</ListGroup.Item>
      <ListGroup.Item className='px-0'>
      <b>Assignee: </b>
      {task.assignee.nickname}
      </ListGroup.Item>
      <ListGroup.Item className='px-0'><b>Project: </b><Link to={'/projects/'+task.project._id}>{task.project.name}</Link></ListGroup.Item>
    </ListGroup>
    <hr />
    <Form onSubmit={handleSubmit} noValidate validated={validated} className="d-flex flex-column gap-1">
      <Form.Group controlId='task-name'>
        <Form.Label>Name (required):</Form.Label>
        <Form.Control size='sm' value={name} onChange={e=>setName(e.target.value)} type="text" name="name" placeholder="name" maxLength={100} required  />
        <Form.Text>No more than 100 characters</Form.Text>
      </Form.Group>
      <Form.Group controlId='taskDescription' name="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          size='sm'
          as="textarea"
          placeholder="Describe task"
          value={description}
          onChange={e=>setDescription(e.target.value)}
          style={{ height: '100px' }}
          maxLength={300}
        />
        <Form.Text>No more than 300 characters</Form.Text>
      </Form.Group>    
      <Form.Group controlId='task-duedate'>
        <Form.Label>dueDate (required):</Form.Label>
        <Form.Control
          size='sm' 
          value={dueDate} 
          onChange={e=>setDueDate(e.target.value)} 
          type="datetime-local" 
          name="dueDate" 
          required  />
      </Form.Group>
      <Form.Check 
        type="switch" 
        id='task-done' 
        name="done"
        label="Done" 
        aria-label={
          done
            ? "make undone"
            : "make done"
        }
        checked={done}
        value={done} 
        onChange={e=>toggleDone()}
      />
      <Button type="submit" variant="success">
        Save Changes
      </Button>
    </Form>
    </div>
  )
}

export default EditTask