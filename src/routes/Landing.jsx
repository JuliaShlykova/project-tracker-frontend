import React from 'react'

import { getTasks } from '../../fakedDb';
import { Link, useLoaderData } from 'react-router-dom';

const Landing = () => {

  return (
    <div>
      <h1>landing</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
    
  )
}

export default Landing