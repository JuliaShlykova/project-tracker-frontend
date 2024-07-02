import React, { useReducer, useState } from 'react'
import { setUser } from '../services/localStorage'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { Link, Form as RouterForm, useActionData, useSubmit } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'


const Login = () => {
  const errors = useActionData();
  const [typePassword, toggleType] = useReducer(type=>type==='password'?'text':'password', 'password');


  return (
    <div className="vw-100 vh-100 login-container">
    <div className="login-wrapper p-3 rounded-4">
    <h1>Login</h1>
    <Form 
      as={RouterForm} 
      method="post"
      className='vstack gap-2'
      variant="white"
    >
      <FloatingLabel controlId="formBasicEmail" label="Email address (required)">
      <Form.Control type="email" name="email" placeholder="Email" required/>
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
      </FloatingLabel>
      <Form.Group controlId="formBasicPassword">
      <FloatingLabel label="Password (required)">
        <Form.Control type={typePassword} name="password" placeholder="Password" required/>
        <Form.Text>
        <button type="button" onClick={() => {toggleType()}} className="clean-btn text-secondary">
        {
          (typePassword==='password')
            ?<><AiFillEye />Show password</>
            :<><AiFillEyeInvisible />Hide password</>
        }
        </button>
        </Form.Text>
      </FloatingLabel>
      </Form.Group>
      {errors
      ?errors.map((error, i)=><p className='text-danger' key={i}>* {error.msg}</p>)
      :null}
      <Button variant="primary" type="submit" className='mt-3'>
        Submit
      </Button>
    </Form>
    <p className='mt-2'>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
    </div>
  )
}

export default Login
