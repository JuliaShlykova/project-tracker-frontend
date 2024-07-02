import React, { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { Form as RouterForm, useActionData, useLoaderData, useLocation, useParams, useRouteLoaderData, useSubmit } from 'react-router-dom';
import { getUser } from '../services/localStorage';

const CreateTask = () => {
  console.log('create task page rendering');
  const {projectId} = useParams();
  const projects = useLoaderData();
  const errors = useActionData();
  const submit = useSubmit();
  const [chosenProject, setChosenProject] = useState(projectId?projects.find(project=>project._id===projectId):null)
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      submit(form, {method: "post", action: "/projects/"+chosenProject._id+"/create-task"});
    } else {
      setValidated(true);
    }
  }

  return (
    <div className='form-container'>
    <h1>Create Task/Issue</h1>
    <Form as={RouterForm} onSubmit={handleSubmit} noValidate validated={validated} className="d-flex flex-column gap-3">
      {errors
      ?errors.map((error, i)=><p className='text-danger' key={i}>* {error.msg}</p>)
      :null}
      <fieldset>
        <legend className='visually-hidden'>Choose type (required)</legend>
        <Form.Check type="radio" id="type-task" name="taskType" value="Task" label="task" inline required />
        <Form.Check type="radio" id="type-issue" name="taskType" value="Issue" label="issue" inline />
      </fieldset>
      <FloatingLabel controlId='task-name' label="Name (required)">
        <Form.Control type="text" name="name" placeholder="name" maxLength={100} required  />
        <Form.Text>No more than 100 characters</Form.Text>
      </FloatingLabel>
      <FloatingLabel controlId="select-project" label="Project (required)">
        <Form.Select 
          onChange={e=>{
            setChosenProject(projects.find(project=>e.target.value===project._id))
          }} 
          aria-label="select project" 
          disabled={Boolean(projectId)}
          required
        >
          {projectId
          ?<option value={projectId}>{chosenProject.name}</option>
          :<>
            <option value="">Choose project</option>
            {projects.map(project=><option value={project._id} key={project._id}>{project.name}</option>)}
          </>}
        </Form.Select>
      </FloatingLabel>    
      {chosenProject
      ?<FloatingLabel controlId="select-assignee" label="Assignee (required)">
        <Form.Select aria-label="select assignee" name="assignee" defaultValue={getUser()._id} required>
          <option value="">Choose assignee</option>
          <option value={chosenProject.author._id}>{chosenProject.author.nickname}</option>
          {chosenProject.participants.map(participant=>(
            <option key={participant._id} value={participant._id}>
              {participant.nickname}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      :null
      }
      <FloatingLabel controlId="dueDate" label="dueDate (required)">
        <Form.Control name="dueDate" type="datetime-local" placeholder="DD/MM/YYYY" required />
      </FloatingLabel>
      <FloatingLabel controlId='taskDescription' label="Description">
        <Form.Control
          as="textarea"
          placeholder="Describe task"
          name="description"
          maxLength={300}
          style={{ height: '100px' }}
        />
        <Form.Text>No more than 300 characters</Form.Text>
      </FloatingLabel>    
      <Button type="submit">Create Task</Button>
    </Form>
    </div>
  )
}

export default CreateTask

