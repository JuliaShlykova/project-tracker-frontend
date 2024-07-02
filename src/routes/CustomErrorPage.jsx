import React from 'react'
import { Navigate, useLocation, useRouteError } from 'react-router-dom';

const CustomErrorPage = () => {
  const error = useRouteError();
  const {state} = useLocation();
  const errorManual = state?.error;

  if (error?.message === 'Network Error'||error?.statusText === 'Network Error'||errorManual?.message === 'Network Error') {
    return <Navigate to="/server-error" replace={true} />
  }

  console.log('error: ', errorManual)

  return (
    <div className='vw-100 vh-100 bg-accent d-flex justify-content-center align-items-center'>
      <div>
        <h1>{error?.status||errorManual?.status}</h1>
        <p>Sorry, an error has occurred:</p>
        <p>
          <i>{error?.statusText||error?.message||errorManual?.message||'Something went wrong'}</i>
        </p>
      </div>
    </div>
  )
}

export default CustomErrorPage