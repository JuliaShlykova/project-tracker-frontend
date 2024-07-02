import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import { getUser, setUser } from '../../services/localStorage'
import { useFetcher, useNavigate } from 'react-router-dom';
import { updateNickname } from '../../api/users';

const ModalChangeNickname = ({profileChange, setProfileChange}) => {
  const [newNickname, setNewNickname] = useState(getUser().nickname);
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await updateNickname(newNickname);
      setUser({...getUser(), nickname: newNickname});
      setProfileChange(false);
    } catch(err) {
      if (err.response?.status===422) {
        setErrors(err.response.data.errors);
      } else {
        navigate('/error-page', { state: { error: {message: err.message} } });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={profileChange==='name'} animation={false} onHide={() => setProfileChange(false)} fullscreen='sm-down'>
    <Modal.Header closeButton>
      <Modal.Title>Change nickname</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit} id='form-change-nickname'>
      {/* <Form as={fetcher.Form} method="post" action='/users/update-nickname' id='form-change-nickname'> */}
        <Form.Group controlId='formBasicNickname'>
          <Form.Label>New nickname: </Form.Label>
          <Form.Control
            type='text' 
            name="nickname" 
            value={newNickname} 
            onChange={e=>setNewNickname(e.target.value)} 
            maxLength={40}
            pattern="[\w\-]+"
            aria-describedby="nicknameHelpBlock"
            required
          />
          <Form.Text muted>{newNickname.length}/40</Form.Text>
          <br />
          <Form.Text id="nicknameHelpBlock" muted>nickname must consist of "-", "_" and alphanumeric english characters</Form.Text>
        </Form.Group>
        {errors
        ?errors.map((error, i)=><p className='text-danger' key={i}>* {error.msg}</p>)
        :null}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setProfileChange(false)}>
        Close
      </Button>
      <Button 
        variant="primary" 
        type='submit' 
        form='form-change-nickname'
        disabled={isLoading}
      >
        {isLoading ? 'Loading…' : "Save Changes"}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalChangeNickname

