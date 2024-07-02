import React, { useRef, useState } from 'react'
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Form as RouterForm, useActionData, useLoaderData, useSubmit } from 'react-router-dom';

const CreateProject = () => {
  const users = useLoaderData();
  const errors = useActionData();
  const submit = useSubmit();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      submit(form, {method: "post"});
    } else {
      setValidated(true);
    }
  }

  return (
    <div className='form-container'>
    <h1>Create Project</h1>
    <Form as={RouterForm} onSubmit={handleSubmit} noValidate validated={validated} className="d-flex flex-column gap-3">
      {errors
      ?errors.map((error, i)=><p className='text-danger' key={i}>* {error.msg}</p>)
      :null}
      <FloatingLabel controlId='project-name' label="Name (required)">
        <Form.Control 
          type="text" 
          name="name" 
          placeholder="name" 
          maxLength={100} 
          pattern="^\S.*\S$"
          required  
        />
        <Form.Text>No more than 100 characters, no space around</Form.Text>
      </FloatingLabel>
      <FloatingLabel controlId="deadline" label="Deadline">
        <Form.Control name="deadline" type="datetime-local" placeholder="DD/MM/YYYY" />
      </FloatingLabel>
      <FloatingLabel controlId='link' name="link" label="Link">
        <Form.Control type="url" placeholder="https://example.com" pattern="https://.*" />
        <Form.Text>Provide link only with "https" protocol</Form.Text>
      </FloatingLabel>   
        <fieldset>
        <legend>Participants:</legend>
        <div className="participants-choice">
        {users.map(user => (
          <Form.Check 
            key={user._id}
            id={user._id}
          >
            <Form.Check.Input type="checkbox" name="participants" value={user._id} />
            <Form.Check.Label>
              {user.profileImgUrl
                ?<img src={user.profileImgUrl} alt="profile image" className='profile-img-small me-1' />
                :null}
              {user.nickname}
            </Form.Check.Label>
          </Form.Check>
        ))}
        </div>
      </fieldset>

      <Button type="submit">Create Project</Button>
    </Form>
    </div>
  )
}

export default CreateProject