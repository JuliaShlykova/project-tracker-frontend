import React, { useReducer, useState } from 'react'
import { setUser } from '../services/localStorage'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { Link, Form as RouterForm, useActionData } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'


const Signup = () => {
  const errors = useActionData();
  const [newNickname, setNewNickname] = useState('');
  const [typePassword, toggleType] = useReducer(type=>type==='password'?'text':'password', 'password');

  return (
    <div className="vw-100 vh-100 login-container">
    <div className="login-wrapper p-3 rounded-4">
    <h1>Signup</h1>
    <Form 
      as={RouterForm} 
      method="post"
      className='vstack gap-4'
      variant="white"
    >
      <FloatingLabel controlId="formBasicEmail" label="Email address (required)">
      <Form.Control type="email" name="email" placeholder="Email" required/>
      </FloatingLabel>
      <FloatingLabel controlId="formNickname" label="Nickname (required)">
      <Form.Control 
        type="text" 
        value={newNickname} 
        onChange={e=>setNewNickname(e.target.value)} 
        name="nickname" 
        placeholder="Nickname" 
        maxLength={40}
        pattern="[\w\-]+"
        aria-describedby="nicknameHelpBlock"
        required/>
      <Form.Text muted>
        {newNickname.length}/40
      </Form.Text>
      <br />
      <Form.Text id="nicknameHelpBlock" muted>
        nickname must consist of "-", "_" and alphanumeric english characters
      </Form.Text>
      </FloatingLabel>
      <FloatingLabel label="Password (required)" controlId="formBasicPassword">
        <Form.Control 
          type={typePassword} 
          name="password" 
          minLength={8} 
          pattern="\S+"
          placeholder="Password" 
          aria-describedby="passwordHelpBlock" 
          required
        />
        <Form.Text>
        <button type="button" onClick={() => {toggleType()}} className="clean-btn text-secondary">
          {
            (typePassword==='password')
              ?<><AiFillEye />Show password</>
              :<><AiFillEyeInvisible />Hide password</>
          }
        </button>
        </Form.Text>
        <br />
        <Form.Text id="passwordHelpBlock" muted>password must contain at least 8 non whitespace characters</Form.Text>
      </FloatingLabel>
      <FloatingLabel label="Confirm password (required)" controlId="formBasicConfirmPassword">
        <Form.Control type="password" name="confirm_password" placeholder="Password" required/>
      </FloatingLabel>
      {errors
      ?errors.map((error, i)=><p className='text-danger' key={i}>* {error.msg}</p>)
      :null}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <p className='mt-2'>Already have an account? <Link to="/login">Login</Link></p>
    </div>
    </div>
  )
}

export default Signup