import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clearStorage } from '../services/localStorage';
import removeTokenCookie from '../utils/removeCookies';

const ServerError = () => {

  useEffect(() => {
    clearStorage();
    removeTokenCookie();
  }, [])


  return (
    <div className='vw-100 vh-100 bg-accent d-flex justify-content-center align-items-center'>
    <div>
      <h1>Server cannot be reached</h1>
      <p><span>Please, try again later. </span>
      <Link to="/">To landing page.</Link>
      </p>
    </div>
    </div>
  )
}

export default ServerError